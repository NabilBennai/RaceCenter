package com.racecenter.auth.api.dto;

public record AuthResponse(String accessToken, String refreshToken, String tokenType, AuthUserResponse user) {
}
