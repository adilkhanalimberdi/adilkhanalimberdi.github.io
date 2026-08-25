package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.request.LanguageCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.LanguageUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.LanguageResponse;
import com.alimberdi.backend.portfolio.service.LanguageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/languages")
@PreAuthorize("hasRole('ADMIN')")
public class LanguageController {

	private final LanguageService languageService;

	@GetMapping
	public ResponseEntity<ApiResponse<List<LanguageResponse>>> getAll() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(languageService.getAllSortedByOrderIndex()));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<LanguageResponse>> create(@RequestBody @Valid LanguageCreateRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(languageService.create(request)));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<ApiResponse<LanguageResponse>> update(@PathVariable UUID id, @RequestBody @Valid LanguageUpdateRequest request) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(languageService.update(id, request)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable UUID id) {
		languageService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
