package com.alimberdi.backend.controller;

import com.alimberdi.backend.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class MainController {

	@GetMapping("/hello")
	public ResponseEntity<ApiResponse<String>> hello() {
		return ResponseEntity.ok(new ApiResponse<>("Hello World"));
	}

}
