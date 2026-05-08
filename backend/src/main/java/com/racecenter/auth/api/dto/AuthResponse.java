package com.racecenter.auth.api.dto;

public record AuthResponse(String accessToken, String tokenType, AuthUserResponse user) {
}
