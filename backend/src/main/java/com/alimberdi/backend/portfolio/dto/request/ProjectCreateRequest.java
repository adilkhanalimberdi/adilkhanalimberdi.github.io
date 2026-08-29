package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record ProjectCreateRequest(
		@NotBlank(message = "Title cannot be blank.")
		@Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters.")
		String title,

		@NotNull(message = "Description cannot be null.")
		@Size(min = 5, max = 2000, message = "Description must be between 5 and 2000 characters.")
		String description,

		@Size(max = 255, message = "Image URL must be at most 255 characters.")
		@URL(message = "Image URL format is invalid.")
		String imageUrl,

		@Size(max = 255, message = "URL must be at most 255 characters.")
		@URL(message = "URL format is invalid.")
		String url,

		@NotNull(message = "Project status cannot be null.")
		ProjectStatus status,

		@PositiveOrZero(message = "Order index cannot be negative.")
		Integer orderIndex
) {}
