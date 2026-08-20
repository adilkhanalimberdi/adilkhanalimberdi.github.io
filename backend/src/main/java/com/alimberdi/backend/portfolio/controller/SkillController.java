package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.request.SkillCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.SkillResponse;
import com.alimberdi.backend.portfolio.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/skill")
@PreAuthorize("hasRole('ADMIN')")
public class SkillController {

	private final SkillService skillService;

	public ResponseEntity<ApiResponse<SkillResponse>> create(@RequestBody @Valid SkillCreateRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(skillService.create(request)));
	}

}
