package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.EducationStatus;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;

import java.math.BigDecimal;
import java.time.YearMonth;

public record EducationCreateRequest(
		@NotBlank(message = "Institution cannot be blank.")
		@Size(min = 5, max = 100, message = "Institution must be between 5 and 100 characters.")
		String institution,

		@NotNull(message = "Description cannot be null.")
		@Size(min = 5, max = 2000, message = "Description must be between 5 and 2000 characters.")
		String description,

		@NotNull(message = "Location cannot be null.")
		@Size(min = 5, max = 100, message = "Location must be between 5 and 100 characters.")
		String location,

		@NotNull(message = "Degree cannot be null.")
		@Size(min = 5, max = 100, message = "Degree must be between 5 and 100 characters.")
		String degree,

		@NotNull(message = "Speciality cannot be null.")
		@Size(min = 5, max = 100, message = "Speciality must be between 5 and 100 characters.")
		String speciality,

		@NotNull(message = "Start date cannot be null.")
		YearMonth startDate,

		YearMonth endDate,

		@PositiveOrZero(message = "Grade cannot be negative.")
		@DecimalMax(value = "4.00", message = "Grade cannot be greater than 4.00.")
		BigDecimal grade,

		@NotNull(message = "Education status cannot be null.")
		EducationStatus status,

		@Size(max = 255, message = "URL must be at most 255 characters.")
		@URL(message = "URL format is invalid.")
		String url,

		@PositiveOrZero(message = "Order index cannot be negative.")
		Integer orderIndex
) {}
