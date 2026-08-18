package com.alimberdi.backend.auth.controller;

import com.alimberdi.backend.auth.dto.AuthResponse;
import com.alimberdi.backend.auth.dto.LoginRequest;
import com.alimberdi.backend.auth.dto.RefreshRequest;
import com.alimberdi.backend.auth.dto.RegisterRequest;
import com.alimberdi.backend.auth.service.AuthService;
import com.alimberdi.backend.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody @Valid LoginRequest request) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(authService.login(request)));
	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody @Valid RegisterRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(authService.register(request)));
	}

	@PostMapping("/refresh")
	public ResponseEntity<ApiResponse<AuthResponse>> refresh(@RequestBody @Valid RefreshRequest request) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(authService.refresh(request)));
	}

}
