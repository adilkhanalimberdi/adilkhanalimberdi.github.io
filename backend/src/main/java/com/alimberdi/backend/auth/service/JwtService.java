package com.alimberdi.backend.auth.service;

import com.alimberdi.backend.auth.model.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {

	@Value("${app.jwt.secret-key}")
	private String secretKey;

	@Value("${app.jwt.expiration.access-minutes}")
	private int accessExpirationMinutes;

	private SecretKey getSecretKey() {
		byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateToken(User user) {
		Instant issuedAt = Instant.now();
		Instant expiration = issuedAt.plus(accessExpirationMinutes, ChronoUnit.MINUTES);

		return Jwts.builder()
				.subject(user.getUsername())
				.claim("role", user.getRole().name())
				.issuedAt(Date.from(issuedAt))
				.expiration(Date.from(expiration))
				.signWith(getSecretKey())
				.compact();
	}

	public String extractUsername(String token) {
		return extractAll(token).getSubject();
	}

	public boolean isTokenValid(String token, String subject) {
		Claims claims = extractAll(token);
		return subject.equals(claims.getSubject()) && !isTokenExpired(claims);
	}

	private boolean isTokenExpired(Claims claims) {
		Instant expiration = claims.getExpiration().toInstant();
		return Instant.now().isAfter(expiration);
	}

	private Claims extractAll(String token) {
		return Jwts.parser()
				.verifyWith(getSecretKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

}
