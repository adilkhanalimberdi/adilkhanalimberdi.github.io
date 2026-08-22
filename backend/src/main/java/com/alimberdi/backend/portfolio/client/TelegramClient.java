package com.alimberdi.backend.portfolio.client;

import com.alimberdi.backend.portfolio.dto.request.TelegramSendMessageRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange
public interface TelegramClient {

	@PostExchange("/sendMessage")
	void sendMessage(@RequestBody TelegramSendMessageRequest request);

}
