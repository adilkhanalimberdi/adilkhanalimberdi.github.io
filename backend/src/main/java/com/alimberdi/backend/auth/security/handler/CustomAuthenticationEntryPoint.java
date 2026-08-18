package com.alimberdi.backend.auth.security.handler;

import com.alimberdi.backend.common.dto.ApiResponse;
import com.alimberdi.backend.common.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NullMarked;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	private final ObjectMapper objectMapper;

	/**
	 * Example response when you try to access secured data with invalid token:
	 * <br />
	 * <code>
	 *     data: {
	 *         statusCode: 401,
	 *         message: "Unauthorized",
	 *         errors: null
	 *     }
	 * </code>
	 */
	@Override
	@NullMarked
	public void commence(
			HttpServletRequest request,
			HttpServletResponse response,
			AuthenticationException authException
	) throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json");

		ErrorResponse errorResponse = new ErrorResponse(
				HttpStatus.UNAUTHORIZED.value(),
				"Unauthorized"
		);

		response.getWriter().write(objectMapper.writeValueAsString(new ApiResponse<>(errorResponse)));
	}

}
