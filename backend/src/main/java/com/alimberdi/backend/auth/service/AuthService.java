package com.alimberdi.backend.auth.service;

import com.alimberdi.backend.auth.dto.*;
import com.alimberdi.backend.auth.model.entity.RefreshToken;
import com.alimberdi.backend.auth.model.entity.User;
import com.alimberdi.backend.portfolio.dto.response.AuthTokens;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserService userService;
	private final JwtService jwtService;
	private final RefreshTokenService refreshTokenService;
	private final AuthenticationManager authenticationManager;

	@Value("${app.admin.username}")
	private String adminUsername;

	@Transactional(rollbackFor = Exception.class)
	public AuthTokens login(LoginRequest loginRequest) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				loginRequest.username(),
				loginRequest.password()
		);
		authenticationManager.authenticate(token);

		User found = userService.getByUsername(loginRequest.username());
		return generateTokens(found);
	}

	@Transactional(rollbackFor = Exception.class)
	public AuthTokens loginAdmin(AdminLoginRequest loginRequest) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				adminUsername,
				loginRequest.password()
		);
		authenticationManager.authenticate(token);

		User found = userService.getByUsername(adminUsername);
		return generateTokens(found);
	}

	@Transactional(rollbackFor = Exception.class)
	public AuthTokens register(RegisterRequest registerRequest) {
		User created = userService.create(registerRequest);
		return generateTokens(created);
	}

	@Transactional(rollbackFor = Exception.class)
	public AuthTokens refresh(String oldRefreshToken) {
		RefreshToken oldToken = refreshTokenService.findByToken(oldRefreshToken);
		User user = oldToken.getUser();

		String access = jwtService.generateToken(user);
		String refresh = refreshTokenService.rotate(user);

		return new AuthTokens(access, refresh);
	}

	private AuthTokens generateTokens(User user) {
		String access = jwtService.generateToken(user);
		String refresh = refreshTokenService.generateRefreshToken(user);
		return new AuthTokens(access, refresh);
	}

}
