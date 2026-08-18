package com.alimberdi.backend.auth.service;

import com.alimberdi.backend.auth.dto.*;
import com.alimberdi.backend.auth.model.entity.RefreshToken;
import com.alimberdi.backend.auth.model.entity.User;
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
	public AuthResponse login(LoginRequest request) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				request.username(),
				request.password()
		);
		authenticationManager.authenticate(token);

		User found = userService.getByUsername(request.username());
		String access = jwtService.generateToken(found);
		String refresh = refreshTokenService.generateRefreshToken(found);

		return new AuthResponse(access, refresh);
	}

	@Transactional(rollbackFor = Exception.class)
	public AuthResponse loginAdmin(AdminLoginRequest request) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				adminUsername,
				request.password()
		);
		authenticationManager.authenticate(token);

		User found = userService.getByUsername(adminUsername);
		String access = jwtService.generateToken(found);
		String refresh = refreshTokenService.generateRefreshToken(found);

		return new AuthResponse(access, refresh);
	}

	@Transactional(rollbackFor = Exception.class)
	public AuthResponse register(RegisterRequest request) {
		User created = userService.create(request);

		String access = jwtService.generateToken(created);
		String refresh = refreshTokenService.generateRefreshToken(created);

		return new AuthResponse(access, refresh);
	}

	@Transactional(rollbackFor = Exception.class)
	public AuthResponse refresh(RefreshRequest request) {
		RefreshToken refreshToken = refreshTokenService.findByToken(request.refreshToken());
		User user = refreshToken.getUser();

		String access = jwtService.generateToken(user);
		String refresh = refreshTokenService.rotate(user);

		return new AuthResponse(access, refresh);
	}

}
