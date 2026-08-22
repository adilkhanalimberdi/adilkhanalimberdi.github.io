package com.alimberdi.backend.common.config;

import com.alimberdi.backend.portfolio.client.TelegramClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class AppConfig {

	@Value("${app.telegram.bot-token}")
	private String botToken;

	@Bean
	public RestClient restClient() {
		return RestClient.builder()
				.build();
	}

	@Bean
	public TelegramClient telegramRestClient() {
		RestClient restClient = RestClient.builder()
				.baseUrl("https://api.telegram.org/bot" + botToken)
				.build();

		RestClientAdapter adapter = RestClientAdapter.create(restClient);
		HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

		return factory.createClient(TelegramClient.class);
	}

}
