package com.racecenter.shared.api;

import java.time.Instant;

public record ApiErrorResponse(String code, String message, Instant timestamp) {
}
