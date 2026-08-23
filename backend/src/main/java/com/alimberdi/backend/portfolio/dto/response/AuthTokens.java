package com.alimberdi.backend.portfolio.dto.response;

public record AuthTokens(
		String accessToken,
		String refreshToken
) {}
