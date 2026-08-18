package com.alimberdi.backend.portfolio.controller;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.portfolio.dto.ContactMessageRequest;
import com.alimberdi.backend.portfolio.dto.ContactMessageResponse;
import com.alimberdi.backend.portfolio.service.ContactMessageService;
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
@RequestMapping("/contact-message")
public class ContactMessageController {

	private final ContactMessageService contactMessageService;

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<Page<ContactMessageResponse>>> getAll(
			@PageableDefault(sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable
	) {
		Page<ContactMessageResponse> messages = contactMessageService.getAll(pageable);
		return new ResponseEntity<>(
				new ApiResponse<>(messages),
				HttpStatus.OK
		);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<ContactMessageResponse>> getById(@PathVariable UUID id) {
		ContactMessageResponse message = contactMessageService.getById(id);
		return new ResponseEntity<>(
				new ApiResponse<>(message),
				HttpStatus.OK
		);
	}

	@PostMapping
	public ResponseEntity<Void> create(@RequestBody @Valid ContactMessageRequest request) {
		contactMessageService.create(request);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

}
