package com.alimberdi.backend.portfolio.dto.response;

import com.alimberdi.backend.portfolio.model.enums.ProjectStatus;

import java.time.Instant;
import java.util.UUID;

public record ProjectResponse(
		UUID id,
		String title,
		String description,
		String imageUrl,
		String url,
		ProjectStatus status,
		Integer orderIndex,
		Instant createdAt
) {}
