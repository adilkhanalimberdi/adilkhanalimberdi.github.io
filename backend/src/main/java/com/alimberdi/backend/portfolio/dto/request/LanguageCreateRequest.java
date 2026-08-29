package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.LanguageLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record LanguageCreateRequest(
		@NotBlank(message = "Language cannot be blank.")
		@Size(min = 3, max = 100, message = "Language must be between 3 and 100 characters.")
		String language,

		@NotNull(message = "Language level cannot be null.")
		LanguageLevel level,

		@PositiveOrZero(message = "Order index cannot be negative.")
		Integer orderIndex
) {}
