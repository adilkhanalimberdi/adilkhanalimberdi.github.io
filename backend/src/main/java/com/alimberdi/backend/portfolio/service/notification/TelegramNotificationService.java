package com.alimberdi.backend.portfolio.service.notification;

import com.alimberdi.backend.portfolio.client.TelegramClient;
import com.alimberdi.backend.portfolio.dto.request.TelegramSendMessageRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TelegramNotificationService implements NotificationService {

	private final TelegramClient telegramClient;

	@Value("${app.telegram.chat-id}")
	private String chatId;

	@Override
	public void sendNotification(String name, String email, String message) {
		TelegramSendMessageRequest request = new TelegramSendMessageRequest(
				chatId,
				String.format(
						"""
						You have received a new message in portfolio!
						
						*Name:* %s
						*Email:* %s
						*Text:*
						%s
						""",
						name, email, message
				),
				"Markdown"
		);

		try {
			telegramClient.sendMessage(request);
		} catch (Exception e) {
			log.error("Failed to send notification to Telegram", e);
		}
	}

}
