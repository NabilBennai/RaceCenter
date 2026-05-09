package com.racecenter.auth.api.dto;

public record ProfileResponse(String username, String email, String bio, ProfilePreferencesResponse preferences) {
}
