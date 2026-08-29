package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.SkillCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record SkillCreateRequest(
		@NotNull(message = "Skill category cannot be null.")
		SkillCategory category,

		@NotBlank(message = "Skill content cannot be blank.")
		@Size(min = 3, max = 100, message = "Skill content must be between 3 and 100 characters.")
		String content,

		@PositiveOrZero(message = "Order index cannot be negative.")
		Integer orderIndex
) {}
