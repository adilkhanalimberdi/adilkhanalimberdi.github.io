package com.alimberdi.backend.dto;

public record ApiResponse<T>(
		T data
) {}
