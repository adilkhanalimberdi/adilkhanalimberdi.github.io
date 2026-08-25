package com.alimberdi.backend.portfolio.repository;

import com.alimberdi.backend.portfolio.model.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, UUID> {

	@Modifying(clearAutomatically = true)
	@Query(value = """
	UPDATE portfolio.contact_messages
	SET is_viewed = NOT is_viewed
	WHERE id = :id
	""", nativeQuery = true)
	void toggleViewed(@Param("id") UUID id);

}
