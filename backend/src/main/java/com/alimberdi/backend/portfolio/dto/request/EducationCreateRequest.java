package com.alimberdi.backend.portfolio.dto.request;

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
		String url,
		Integer orderIndex
) {}
