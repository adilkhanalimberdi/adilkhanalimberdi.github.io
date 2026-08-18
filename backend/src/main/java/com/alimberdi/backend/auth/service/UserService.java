package com.alimberdi.backend.auth.service;

import com.alimberdi.backend.auth.dto.RegisterRequest;
import com.alimberdi.backend.auth.exception.UserNotFoundException;
import com.alimberdi.backend.auth.model.entity.User;
import com.alimberdi.backend.auth.model.enums.UserRole;
import com.alimberdi.backend.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;

	public User getByUsername(String username) {
		return repository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));
	}

	public User create(RegisterRequest request) {
		User user = User.builder()
				.username(request.username())
				.email(request.email())
				.password(passwordEncoder.encode(request.password()))
				.role(UserRole.USER)
				.isActive(true)
				.build();

		return repository.save(user);
	}

}
