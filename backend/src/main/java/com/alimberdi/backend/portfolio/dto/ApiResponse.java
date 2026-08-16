package com.alimberdi.backend.portfolio.dto;

public record ApiResponse<T>(
		T data
) {}
