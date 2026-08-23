package com.alimberdi.backend.auth.repository;

import com.alimberdi.backend.auth.model.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	Optional<RefreshToken> findByToken(String token);

	@Modifying(clearAutomatically = true)
	@Query("DELETE FROM RefreshToken r WHERE r.user.id = :userId")
	void deleteByUserId(@Param("userId") UUID userId);

}
