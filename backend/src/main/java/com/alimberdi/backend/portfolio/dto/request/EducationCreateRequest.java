package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.EducationStatus;

import java.math.BigDecimal;
import java.time.YearMonth;

public record EducationCreateRequest(
		String institution,
		String description,
		String location,
		String degree,
		String speciality,
		YearMonth startDate,
		YearMonth endDate,
		BigDecimal grade,
		EducationStatus status,
		String url,
		Integer orderIndex
) {}
