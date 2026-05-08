package com.racecenter.auth.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.racecenter.auth.api.dto.AuthResponse;
import com.racecenter.auth.api.dto.AuthUserResponse;
import com.racecenter.auth.api.dto.LoginRequest;
import com.racecenter.auth.api.dto.MessageResponse;
import com.racecenter.auth.api.dto.RefreshTokenRequest;
import com.racecenter.auth.api.dto.RegisterRequest;
import com.racecenter.auth.domain.EmailVerificationTokenEntity;
import com.racecenter.auth.domain.EmailVerificationTokenRepository;
import com.racecenter.auth.domain.PasswordResetTokenEntity;
import com.racecenter.auth.domain.PasswordResetTokenRepository;
import com.racecenter.auth.domain.RefreshTokenEntity;
import com.racecenter.auth.domain.RefreshTokenRepository;
import com.racecenter.auth.domain.Role;
import com.racecenter.auth.domain.UserEntity;
import com.racecenter.auth.domain.UserRepository;
import com.racecenter.auth.security.JwtService;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final EmailVerificationTokenRepository emailVerificationTokenRepository;
	private final PasswordResetTokenRepository passwordResetTokenRepository;
	private final RefreshTokenRepository refreshTokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final EmailVerificationMailer emailVerificationMailer;

	public AuthService(UserRepository userRepository, EmailVerificationTokenRepository emailVerificationTokenRepository,
			PasswordResetTokenRepository passwordResetTokenRepository, RefreshTokenRepository refreshTokenRepository,
			PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager,
			EmailVerificationMailer emailVerificationMailer) {
		this.userRepository = userRepository;
		this.emailVerificationTokenRepository = emailVerificationTokenRepository;
		this.passwordResetTokenRepository = passwordResetTokenRepository;
		this.refreshTokenRepository = refreshTokenRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
		this.emailVerificationMailer = emailVerificationMailer;
	}

	@Transactional
	public MessageResponse register(RegisterRequest request) {
		if (userRepository.existsByEmailIgnoreCase(request.email())) {
			throw new AuthException("Cet e-mail est deja utilise");
		}
		if (userRepository.existsByUsernameIgnoreCase(request.username())) {
			throw new AuthException("Ce nom d'utilisateur est deja utilise");
		}

		var user = new UserEntity();
		user.setEmail(request.email().trim().toLowerCase());
		user.setUsername(request.username().trim());
		user.setPasswordHash(passwordEncoder.encode(request.password()));
		user.setRole(Role.USER);
		user.setEmailVerified(false);
		var savedUser = userRepository.save(user);
		createAndSendVerificationToken(savedUser);
		return new MessageResponse("Compte cree. Verifie ton e-mail pour activer ton compte");
	}

	public AuthResponse login(LoginRequest request) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password()));
		} catch (BadCredentialsException exception) {
			throw new AuthException("Identifiants invalides");
		}

		var user = userRepository.findByEmailIgnoreCase(request.email())
				.orElseThrow(() -> new AuthException("Identifiants invalides"));
		if (!user.isEmailVerified()) {
			throw new AuthException("Compte non verifie. Verifie ton e-mail avant de te connecter");
		}
		return toResponse(user);
	}

	@Transactional
	public AuthResponse refresh(RefreshTokenRequest request) {
		var storedToken = refreshTokenRepository.findByToken(request.refreshToken())
				.orElseThrow(() -> new AuthException("Refresh token invalide"));
		if (storedToken.getRevokedAt() != null) {
			throw new AuthException("Refresh token revoque");
		}
		if (storedToken.getExpiresAt().isBefore(Instant.now())) {
			throw new AuthException("Refresh token expire");
		}
		storedToken.setRevokedAt(Instant.now());
		refreshTokenRepository.save(storedToken);
		return toResponse(storedToken.getUser());
	}

	@Transactional
	public MessageResponse verifyEmail(String tokenValue) {
		var token = emailVerificationTokenRepository.findByToken(tokenValue)
				.orElseThrow(() -> new AuthException("Token de verification invalide"));
		if (token.getVerifiedAt() != null) {
			throw new AuthException("Ce token a deja ete utilise");
		}
		if (token.getExpiresAt().isBefore(Instant.now())) {
			throw new AuthException("Token expire");
		}
		var user = token.getUser();
		user.setEmailVerified(true);
		token.setVerifiedAt(Instant.now());
		userRepository.save(user);
		emailVerificationTokenRepository.save(token);
		return new MessageResponse("Adresse e-mail verifiee avec succes");
	}

	@Transactional
	public MessageResponse forgotPassword(String email) {
		var user = userRepository.findByEmailIgnoreCase(email.trim().toLowerCase()).orElse(null);
		if (user != null) {
			createAndSendPasswordResetToken(user);
		}
		return new MessageResponse("Si ce compte existe, un e-mail de reinitialisation a ete envoye");
	}

	@Transactional
	public MessageResponse resetPassword(String tokenValue, String newPassword) {
		var token = passwordResetTokenRepository.findByToken(tokenValue)
				.orElseThrow(() -> new AuthException("Token de reinitialisation invalide"));
		if (token.getUsedAt() != null) {
			throw new AuthException("Ce token a deja ete utilise");
		}
		if (token.getExpiresAt().isBefore(Instant.now())) {
			throw new AuthException("Token expire");
		}
		var user = token.getUser();
		user.setPasswordHash(passwordEncoder.encode(newPassword));
		token.setUsedAt(Instant.now());
		userRepository.save(user);
		passwordResetTokenRepository.save(token);
		return new MessageResponse("Mot de passe reinitialise avec succes");
	}

	private void createAndSendVerificationToken(UserEntity user) {
		var token = new EmailVerificationTokenEntity();
		token.setUser(user);
		token.setToken(UUID.randomUUID().toString().replace("-", ""));
		token.setExpiresAt(Instant.now().plus(24, ChronoUnit.HOURS));
		emailVerificationTokenRepository.save(token);
		emailVerificationMailer.sendVerificationEmail(user.getEmail(), token.getToken());
	}

	private void createAndSendPasswordResetToken(UserEntity user) {
		var token = new PasswordResetTokenEntity();
		token.setUser(user);
		token.setToken(UUID.randomUUID().toString().replace("-", ""));
		token.setExpiresAt(Instant.now().plus(2, ChronoUnit.HOURS));
		passwordResetTokenRepository.save(token);
		emailVerificationMailer.sendResetPasswordEmail(user.getEmail(), token.getToken());
	}

	private AuthResponse toResponse(UserEntity user) {
		var accessToken = jwtService.generateToken(user.getId(), user.getEmail());
		var refreshToken = createRefreshToken(user);
		var userResponse = new AuthUserResponse(user.getId(), user.getEmail(), user.getUsername(), user.getRole(),
				user.isEmailVerified());
		return new AuthResponse(accessToken, refreshToken, "Bearer", userResponse);
	}

	private String createRefreshToken(UserEntity user) {
		var refresh = new RefreshTokenEntity();
		refresh.setUser(user);
		refresh.setToken(UUID.randomUUID().toString().replace("-", ""));
		refresh.setExpiresAt(Instant.now().plus(30, ChronoUnit.DAYS));
		refreshTokenRepository.save(refresh);
		return refresh.getToken();
	}
}
