package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.request.SkillCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.SkillUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.SkillByCategory;
import com.alimberdi.backend.portfolio.dto.response.SkillResponse;
import com.alimberdi.backend.portfolio.service.SkillService;
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
@RequestMapping("/skills")
@PreAuthorize("hasRole('ADMIN')")
public class SkillController {

	private final SkillService skillService;

	@GetMapping
	public ResponseEntity<ApiResponse<List<SkillByCategory>>> getAll() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(skillService.getAllSortedByOrderIndexGroupedByCategory()));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<SkillResponse>> create(@RequestBody @Valid SkillCreateRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(skillService.create(request)));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<ApiResponse<SkillResponse>> update(@PathVariable UUID id, @RequestBody @Valid SkillUpdateRequest request) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(skillService.update(id, request)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable UUID id) {
		skillService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
