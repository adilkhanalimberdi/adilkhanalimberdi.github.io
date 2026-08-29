package com.alimberdi.backend.portfolio.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TelegramSendMessageRequest(
		@JsonProperty("chat_id")
		String chatId,

		@NotBlank(message = "Message text cannot be blank.")
		@Size(min = 3, max = 1000, message = "Message text must be between 3 and 1000 characters.")
		String text,

		@JsonProperty("parse_mode")
		String parseMode
) {}
