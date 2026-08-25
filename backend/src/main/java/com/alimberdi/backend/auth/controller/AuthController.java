package com.alimberdi.backend.auth.controller;

import com.alimberdi.backend.auth.dto.*;
import com.alimberdi.backend.auth.service.AuthService;
import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.response.AuthTokens;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	@Value("${app.jwt.expiration.refresh-minutes}")
	private int refreshExpirationMinutes;

	@Value("${app.cookie.secure}")
	private boolean cookieSecure;

	@Value("${app.cookie.same-site}")
	private String cookieSameSite;

	@Value("${app.cookie.partitioned}")
	private boolean cookiePartitioned;

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthResponse>> login(
			@RequestBody @Valid LoginRequest request
	) {
		AuthTokens tokens = authService.login(request);
		return buildResponse(tokens, HttpStatus.OK);
	}

	@PostMapping("/admin/login")
	public ResponseEntity<ApiResponse<AuthResponse>> loginAdmin(
			@RequestBody @Valid AdminLoginRequest loginRequest
	) {
		AuthTokens tokens = authService.loginAdmin(loginRequest);
		return buildResponse(tokens, HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<AuthResponse>> register(
			@RequestBody @Valid RegisterRequest registerRequest
	) {
		AuthTokens tokens = authService.register(registerRequest);
		return buildResponse(tokens, HttpStatus.CREATED);
	}

	@PostMapping("/refresh")
	public ResponseEntity<ApiResponse<AuthResponse>> refresh(
			@CookieValue(name = "refreshToken") String refreshToken
	) {
		AuthTokens tokens = authService.refresh(refreshToken);
		return buildResponse(tokens, HttpStatus.OK);
	}

	private ResponseEntity<ApiResponse<AuthResponse>> buildResponse(AuthTokens tokens, HttpStatus status) {
		AuthResponse response = new AuthResponse(tokens.accessToken());

		ResponseCookie cookie = ResponseCookie.from("refreshToken", tokens.refreshToken())
				.httpOnly(true)
				.secure(cookieSecure)
				.sameSite(cookieSameSite)
				.partitioned(cookiePartitioned)
				.path("/api/v1/auth")
				.maxAge(Duration.ofMinutes(refreshExpirationMinutes))
				.build();

		return ResponseEntity
				.status(status)
				.header(HttpHeaders.SET_COOKIE, cookie.toString())
				.body(new ApiResponse<>(response));
	}

}
