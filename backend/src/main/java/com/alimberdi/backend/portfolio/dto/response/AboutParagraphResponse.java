package com.alimberdi.backend.portfolio.dto.response;

import java.time.Instant;
import java.util.UUID;

public record AboutParagraphResponse(
		UUID id,
		String content,
		Integer orderIndex,
		Instant createdAt
) {}
