package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.SkillCategory;

public record SkillUpdateRequest(
		SkillCategory category,
		String content
) {}
