package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.request.AboutParagraphCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.AboutParagraphUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.AboutParagraphResponse;
import com.alimberdi.backend.portfolio.service.AboutParagraphService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/about-paragraphs")
@PreAuthorize("hasRole('ADMIN')")
public class AboutParagraphController {

	private final AboutParagraphService aboutParagraphService;


	@GetMapping
	public ResponseEntity<ApiResponse<Page<AboutParagraphResponse>>> getAll(
			@PageableDefault(sort = "orderIndex", direction = Sort.Direction.ASC) Pageable pageable
	) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(aboutParagraphService.getAll(pageable)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<AboutParagraphResponse>> create(@RequestBody @Valid AboutParagraphCreateRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(aboutParagraphService.create(request)));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<ApiResponse<AboutParagraphResponse>> update(@PathVariable UUID id, @RequestBody @Valid AboutParagraphUpdateRequest request) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(aboutParagraphService.update(id, request)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> delete(@PathVariable UUID id) {
		aboutParagraphService.delete(id);
		return ResponseEntity
				.status(HttpStatus.NO_CONTENT)
				.body(Map.of("status", "success"));
	}

}
