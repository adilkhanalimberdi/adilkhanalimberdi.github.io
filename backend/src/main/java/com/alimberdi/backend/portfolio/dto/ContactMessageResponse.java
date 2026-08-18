package com.alimberdi.backend.portfolio.dto;

import java.time.Instant;
import java.util.UUID;

public record ContactMessageResponse(
		UUID id,
		String fullName,
		String email,
		String message,
		Instant createdAt
) {}
