package com.racecenter.auth.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.racecenter.auth.api.dto.AuthResponse;
import com.racecenter.auth.api.dto.LoginRequest;
import com.racecenter.auth.api.dto.MessageResponse;
import com.racecenter.auth.api.dto.RefreshTokenRequest;
import com.racecenter.auth.api.dto.RegisterRequest;
import com.racecenter.auth.api.dto.VerifyEmailRequest;
import com.racecenter.auth.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public MessageResponse register(@Valid @RequestBody RegisterRequest request) {
		return authService.register(request);
	}

	@PostMapping("/login")
	public AuthResponse login(@Valid @RequestBody LoginRequest request) {
		return authService.login(request);
	}

	@PostMapping("/refresh")
	public AuthResponse refresh(@Valid @RequestBody RefreshTokenRequest request) {
		return authService.refresh(request);
	}

	@PostMapping("/verify-email")
	public MessageResponse verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
		return authService.verifyEmail(request.token());
	}
}
