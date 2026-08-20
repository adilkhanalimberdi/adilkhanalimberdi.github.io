package com.alimberdi.backend.portfolio.dto.response;

import com.alimberdi.backend.portfolio.model.enums.SkillCategory;

import java.util.List;

public record SkillByCategory(
		SkillCategory category,
		List<SkillResponse> content
) {}
