package com.alimberdi.backend.portfolio.dto.response;

import java.time.Instant;
import java.util.UUID;

public record ContactMessageResponse(
		UUID id,
		String fullName,
		String email,
		String message,
		Instant createdAt
) {}
