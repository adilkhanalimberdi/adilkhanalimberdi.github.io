package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.LanguageLevel;

public record LanguageUpdateRequest(
		String language,
		LanguageLevel level
) {}
