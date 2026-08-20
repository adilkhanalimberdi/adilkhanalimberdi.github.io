package com.alimberdi.backend.portfolio.dto.response;

import java.time.Instant;
import java.util.UUID;

public record SkillResponse(
		UUID id,
		String category,
		String content,
		Integer orderIndex,
		Instant createdAt
) {}
