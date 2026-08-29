package com.alimberdi.backend.portfolio.dto.request;

import jakarta.validation.constraints.*;

public record AboutParagraphCreateRequest(
		@NotBlank(message = "Paragraph content cannot be blank.")
		@Size(min = 5, max = 1000, message = "Paragraph content must be between 5 and 1000 characters.")
		String content,

		@PositiveOrZero(message = "Order index cannot be negative.")
		Integer orderIndex
) {}
