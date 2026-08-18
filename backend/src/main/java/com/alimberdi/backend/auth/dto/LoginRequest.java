package com.alimberdi.backend.auth.dto;

public record LoginRequest(
		String username,
		String password
) {}
