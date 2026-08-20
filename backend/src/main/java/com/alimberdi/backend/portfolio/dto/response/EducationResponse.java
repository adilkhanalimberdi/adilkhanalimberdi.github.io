package com.alimberdi.backend.portfolio.dto.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.YearMonth;
import java.util.UUID;

public record EducationResponse(
		UUID id,
		String institution,
		String description,
		String location,
		String degree,
		String speciality,
		YearMonth startDate,
		YearMonth endDate,
		BigDecimal grade,
		String url,
		Integer orderIndex,
		Instant createdAt
) {}
