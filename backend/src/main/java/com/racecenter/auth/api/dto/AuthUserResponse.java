package com.racecenter.auth.api.dto;

import com.racecenter.auth.domain.Role;

public record AuthUserResponse(Long id, String email, String username, Role role, boolean emailVerified) {
}
