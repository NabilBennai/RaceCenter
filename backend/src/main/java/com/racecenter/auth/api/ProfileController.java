package com.racecenter.auth.api;

import com.racecenter.auth.api.dto.ProfileResponse;
import com.racecenter.auth.api.dto.ProfilePreferencesResponse;
import com.racecenter.auth.api.dto.UpdateProfileRequest;
import com.racecenter.auth.domain.UserRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/profile")
class ProfileController {

	private final UserRepository userRepository;

	ProfileController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/me")
	ProfileResponse me(Authentication authentication) {
		return toProfileResponse(findCurrentUser(authentication));
	}

	@PutMapping("/me")
	ProfileResponse updateMe(Authentication authentication, @Valid @RequestBody UpdateProfileRequest request) {
		var user = findCurrentUser(authentication);
		user.setBio(clean(request.bio()));
		user.setFavoriteTeam(clean(request.favoriteTeam()));
		user.setFavoriteDriver(clean(request.favoriteDriver()));
		user.setFavoriteConstructor(clean(request.favoriteConstructor()));
		var savedUser = userRepository.save(user);
		return toProfileResponse(savedUser);
	}

	private com.racecenter.auth.domain.UserEntity findCurrentUser(Authentication authentication) {
		return userRepository.findByEmailIgnoreCase(authentication.getName())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
	}

	private ProfileResponse toProfileResponse(com.racecenter.auth.domain.UserEntity user) {
		var preferences = new ProfilePreferencesResponse(user.getFavoriteTeam(), user.getFavoriteDriver(),
				user.getFavoriteConstructor());
		return new ProfileResponse(user.getUsername(), user.getEmail(), user.getBio(), preferences);
	}

	private String clean(String value) {
		if (value == null) {
			return null;
		}
		var trimmed = value.trim();
		return trimmed.isEmpty() ? null : trimmed;
	}
}
