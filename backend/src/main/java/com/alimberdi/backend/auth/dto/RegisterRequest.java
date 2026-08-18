package com.alimberdi.backend.auth.dto;

public record RegisterRequest(
		String username,
		String email,
		String password
) {}
