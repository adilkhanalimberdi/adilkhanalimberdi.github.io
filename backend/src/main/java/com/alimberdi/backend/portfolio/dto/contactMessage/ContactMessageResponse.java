package com.alimberdi.backend.portfolio.dto.contactMessage;

import java.time.Instant;
import java.util.UUID;

public record ContactMessageResponse(
		UUID id,
		String fullName,
		String email,
		String message,
		Instant createdAt
) {}
