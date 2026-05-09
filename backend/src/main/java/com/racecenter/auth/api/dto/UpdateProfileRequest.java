package com.racecenter.auth.api.dto;

import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(@Size(max = 500, message = "La bio ne doit pas depasser 500 caracteres") String bio,
		@Size(max = 100, message = "L'equipe favorite ne doit pas depasser 100 caracteres") String favoriteTeam,
		@Size(max = 100, message = "Le pilote favori ne doit pas depasser 100 caracteres") String favoriteDriver,
		@Size(max = 100, message = "Le constructeur favori ne doit pas depasser 100 caracteres") String favoriteConstructor) {
}
