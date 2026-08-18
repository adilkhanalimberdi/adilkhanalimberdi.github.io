package com.alimberdi.backend.auth.security.handler;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.common.dto.ErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NullMarked;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	private final ObjectMapper objectMapper;

	/**
	 * Example response when you try to access secured data without authenticating:
	 * < />
	 * <code>
	 * data: {
	 * 	statusCode: 403,
	 * 	message: "Access Denied",
	 * 	errors: null
	 * }
	 * </code>
	 */
	@Override
	@NullMarked
	public void handle(
			HttpServletRequest request,
			HttpServletResponse response,
			AccessDeniedException accessDeniedException
	) throws IOException {
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setContentType("application/json");

		ErrorResponse errorResponse = new ErrorResponse(
				HttpStatus.FORBIDDEN.value(),
				"Access Denied"
		);

		response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
	}

}
