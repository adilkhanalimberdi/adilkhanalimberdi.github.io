package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.response.AboutParagraphResponse;
import com.alimberdi.backend.portfolio.dto.response.PortfolioResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

	private final AboutParagraphService aboutParagraphService;

	public PortfolioResponse getPortfolio() {
		List<AboutParagraphResponse> paragraphs = aboutParagraphService.getAllSortedByOrderIndex();

		return new PortfolioResponse(
				paragraphs
		);
	}

}
