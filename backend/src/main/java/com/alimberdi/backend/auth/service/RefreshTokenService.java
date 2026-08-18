package com.alimberdi.backend.auth.service;

import com.alimberdi.backend.auth.exception.RefreshTokenNotFoundException;
import com.alimberdi.backend.auth.model.entity.RefreshToken;
import com.alimberdi.backend.auth.model.entity.User;
import com.alimberdi.backend.auth.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

	@Value("${app.jwt.expiration.refresh-minutes}")
	private int refreshExpirationMinutes;

	private final RefreshTokenRepository repository;

	public RefreshToken findByToken(String token) {
		return repository.findByToken(token)
				.orElseThrow(() -> new RefreshTokenNotFoundException("Refresh token not found"));
	}

	@Transactional(rollbackFor = Exception.class)
	public String rotate(User user) {
		deleteByUserId(user.getId());
		return generateRefreshToken(user);
	}

	public String generateRefreshToken(User user) {
		String token = UUID.randomUUID().toString();
		Instant issuedAt = Instant.now();
		Instant expiration = issuedAt.plus(refreshExpirationMinutes, ChronoUnit.MINUTES);

		RefreshToken refreshToken = RefreshToken.builder()
				.token(token)
				.user(user)
				.issuedAt(issuedAt)
				.expiration(expiration)
				.build();

		return repository.save(refreshToken).getToken();
	}

	public void deleteByUserId(UUID userId) {
		repository.deleteByUserId(userId);
	}

	public void delete(RefreshToken token) {
		repository.delete(token);
	}

}
