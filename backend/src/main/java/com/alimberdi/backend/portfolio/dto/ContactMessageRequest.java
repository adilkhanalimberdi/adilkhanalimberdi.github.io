package com.alimberdi.backend.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactMessageRequest(
		@NotBlank(message = "Full name should not be blank")
		@Size(min = 5, max = 80, message = "Full name must be between 5 and 80 characters.")
		String fullName,

		@NotBlank(message = "Email address should not me blank")
		@Email(message = "Invalid email format.")
		@Size(min = 8, max = 80, message = "Email address must be between 5 and 80 characters.")
		String email,

		@NotBlank(message = "Message should not be blank")
		@Size(min = 10, max = 3000, message = "Message must be between 10 and 3000 characters.")
		String message
) {}
