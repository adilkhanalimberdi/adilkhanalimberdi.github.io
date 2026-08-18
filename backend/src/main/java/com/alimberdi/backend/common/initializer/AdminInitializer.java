package com.alimberdi.backend.common.initializer;

import com.alimberdi.backend.auth.model.entity.User;
import com.alimberdi.backend.auth.model.enums.UserRole;
import com.alimberdi.backend.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AdminInitializer implements ApplicationRunner {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Value("${app.admin.username}")
	private String adminUsername;
	@Value("${app.admin.email}")
	private String adminEmail;
	@Value("${app.admin.password}")
	private String adminPassword;

	@Override
	public void run(@NonNull ApplicationArguments args) {
		boolean usernameExists = userRepository.existsByUsername(adminUsername);
		boolean emailExists = userRepository.existsByEmail(adminEmail);

		if (!usernameExists && !emailExists) {
			log.info("Admin user missing, creating system admin...");
			User user = User.builder()
					.username(adminUsername)
					.password(passwordEncoder.encode(adminPassword))
					.email(adminEmail)
					.role(UserRole.ADMIN)
					.isActive(true)
					.build();
			userRepository.save(user);
		}
	}

}
