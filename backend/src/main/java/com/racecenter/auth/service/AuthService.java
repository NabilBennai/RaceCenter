package com.racecenter.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.racecenter.auth.api.dto.AuthResponse;
import com.racecenter.auth.api.dto.AuthUserResponse;
import com.racecenter.auth.api.dto.LoginRequest;
import com.racecenter.auth.api.dto.RegisterRequest;
import com.racecenter.auth.domain.Role;
import com.racecenter.auth.domain.UserEntity;
import com.racecenter.auth.domain.UserRepository;
import com.racecenter.auth.security.JwtService;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	@Transactional
	public AuthResponse register(RegisterRequest request) {
		if (userRepository.existsByEmailIgnoreCase(request.email())) {
			throw new AuthException("Cet e-mail est déjà utilisé");
		}
		if (userRepository.existsByUsernameIgnoreCase(request.username())) {
			throw new AuthException("Ce nom d'utilisateur est déjà utilisé");
		}

		var user = new UserEntity();
		user.setEmail(request.email().trim().toLowerCase());
		user.setUsername(request.username().trim());
		user.setPasswordHash(passwordEncoder.encode(request.password()));
		user.setRole(Role.USER);
		var savedUser = userRepository.save(user);
		return toResponse(savedUser);
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
		return toResponse(user);
	}

	private AuthResponse toResponse(UserEntity user) {
		var token = jwtService.generateToken(user.getId(), user.getEmail());
		var userResponse = new AuthUserResponse(user.getId(), user.getEmail(), user.getUsername(), user.getRole());
		return new AuthResponse(token, "Bearer", userResponse);
	}
}
