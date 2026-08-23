package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.request.ProjectCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.ProjectUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.ProjectResponse;
import com.alimberdi.backend.portfolio.service.ProjectService;
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

import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
@PreAuthorize("hasRole('ADMIN')")
public class ProjectController {

	private final ProjectService projectService;

	@GetMapping
	public ResponseEntity<ApiResponse<Page<ProjectResponse>>> getAll(
			@PageableDefault(sort = "orderIndex", direction = Sort.Direction.ASC) Pageable pageable
	) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(projectService.getAll(pageable)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<ProjectResponse>> create(@RequestBody @Valid ProjectCreateRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(projectService.create(request)));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<ApiResponse<ProjectResponse>> update(@PathVariable UUID id, @RequestBody @Valid ProjectUpdateRequest request) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ApiResponse<>(projectService.update(id, request)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> delete(@PathVariable UUID id) {
		projectService.delete(id);
		return ResponseEntity
				.status(HttpStatus.NO_CONTENT)
				.body(Map.of("status", "success"));
	}

}
