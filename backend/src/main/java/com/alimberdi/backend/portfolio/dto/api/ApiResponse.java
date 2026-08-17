package com.alimberdi.backend.portfolio.dto.api;

public record ApiResponse<T>(
		T data
) {}
