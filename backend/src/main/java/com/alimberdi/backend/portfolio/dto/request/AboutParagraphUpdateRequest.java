package com.alimberdi.backend.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AboutParagraphUpdateRequest(
		@NotBlank(message = "Paragraph content cannot be blank.")
		@Size(min = 5, max = 1000, message = "Paragraph content must be between 5 and 1000 characters.")
		String content
) {}
