package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.request.EducationCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.EducationUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.EducationResponse;
import com.alimberdi.backend.portfolio.service.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/educations")
@PreAuthorize("hasRole('ADMIN')")
public class EducationController {

	private final EducationService educationService;

	@GetMapping
	public ResponseEntity<ApiResponse<Page<EducationResponse>>> getAll(
			@PageableDefault(sort = "orderIndex", direction = Sort.Direction.ASC) Pageable pageable
	) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(educationService.getAll(pageable)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<EducationResponse>> create(@RequestBody @Valid EducationCreateRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(educationService.create(request)));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<ApiResponse<EducationResponse>> update(@PathVariable UUID id, @RequestBody @Valid EducationUpdateRequest request) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(educationService.update(id, request)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable UUID id) {
		educationService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
