package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.request.EducationCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.EducationResponse;
import com.alimberdi.backend.portfolio.service.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/education")
public class EducationController {

	private final EducationService educationService;

	@PostMapping
	public ResponseEntity<ApiResponse<EducationResponse>> create(@RequestBody @Valid EducationCreateRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(educationService.create(request)));
	}

}
