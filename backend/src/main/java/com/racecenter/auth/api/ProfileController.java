package com.racecenter.auth.api;

import com.racecenter.auth.api.dto.ProfileResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
class ProfileController {

	@GetMapping("/me")
	ProfileResponse me(Authentication authentication) {
		return new ProfileResponse(authentication.getName());
	}
}
