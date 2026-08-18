package com.alimberdi.backend.portfolio.dto.request;

public record AboutParagraphCreateRequest(
		String content,
		Integer orderIndex
) {}
