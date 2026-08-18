package com.alimberdi.backend.auth.dto;

public record AuthResponse(
		String accessToken,
		String refreshToken
) {}
