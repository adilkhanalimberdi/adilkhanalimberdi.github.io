package com.alimberdi.backend.common.exception;

import com.alimberdi.backend.auth.exception.RefreshTokenNotFoundException;
import com.alimberdi.backend.common.dto.ErrorResponse;
import com.alimberdi.backend.portfolio.exception.ContactMessageNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult().getFieldErrors().forEach((error) -> {
			String field = error.getField();
			errors.put(field, error.getDefaultMessage());
		});

		ErrorResponse response = new ErrorResponse(
				HttpStatus.BAD_REQUEST.value(),
				"Validation Error",
				errors
		);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
		ErrorResponse response = new ErrorResponse(
				HttpStatus.BAD_REQUEST.value(),
				ex.getMessage()
		);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ContactMessageNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleContactMessageNotFoundException(ContactMessageNotFoundException ex) {
		ErrorResponse response = new ErrorResponse(
				HttpStatus.NOT_FOUND.value(),
				ex.getMessage()
		);

		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(RefreshTokenNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleRefreshTokenNotFound() {
		ErrorResponse response = new ErrorResponse(
				HttpStatus.UNAUTHORIZED.value(),
				"Session expired or invalid refresh token"
		);

		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(ObjectOptimisticLockingFailureException.class)
	public ResponseEntity<ErrorResponse> handleOptimisticLocking() {
		ErrorResponse response = new ErrorResponse(
				HttpStatus.UNAUTHORIZED.value(),
				"Session expired or invalid refresh token"
		);

		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorResponse> handleBadCredentialsException() {
		ErrorResponse response = new ErrorResponse(
				HttpStatus.FORBIDDEN.value(),
				"Invalid username or password"
		);

		return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler({AuthorizationDeniedException.class, AccessDeniedException.class})
	public ResponseEntity<ErrorResponse> handleAuthorizationDeniedException(AuthorizationDeniedException ex) {
		ErrorResponse response = new ErrorResponse(
				HttpStatus.FORBIDDEN.value(),
				"Access Denied"
		);

		return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
		log.error("Generic Exception: {}", ex.getMessage(), ex);
		ErrorResponse response = new ErrorResponse(
				HttpStatus.INTERNAL_SERVER_ERROR.value(),
				"Internal Server Error",
				null);

		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
