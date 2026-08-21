package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.LanguageLevel;

public record LanguageCreateRequest(
		String language,
		LanguageLevel level,
		Integer orderIndex
) {}
