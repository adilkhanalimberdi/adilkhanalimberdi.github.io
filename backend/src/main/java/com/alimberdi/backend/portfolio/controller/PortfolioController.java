package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.response.PortfolioResponse;
import com.alimberdi.backend.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/portfolio")
public class PortfolioController {

	private final PortfolioService portfolioService;

	@GetMapping
	public ResponseEntity<ApiResponse<PortfolioResponse>> getPortfolio() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(portfolioService.getPortfolio()));
	}

}
