package com.alimberdi.backend.common.dto;

public record ApiResponse<T>(
		T data
) {}
