package com.alimberdi.backend.portfolio.dto.request;

import com.alimberdi.backend.portfolio.model.enums.ProjectStatus;

public record ProjectUpdateRequest(
		String title,
		String description,
		String imageUrl,
		String url,
		ProjectStatus status
) {}
