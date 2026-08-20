package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.SkillCategory;

public record SkillCreateRequest(
		SkillCategory category,
		String skill,
		Integer orderIndex
) {}
