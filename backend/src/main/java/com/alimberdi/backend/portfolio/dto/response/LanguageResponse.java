package com.alimberdi.backend.portfolio.dto.response;

import com.alimberdi.backend.portfolio.model.enums.LanguageLevel;

import java.time.Instant;
import java.util.UUID;

public record LanguageResponse(
		UUID id,
		String language,
		LanguageLevel level,
		Integer orderIndex,
		Instant createdAt
) {}
