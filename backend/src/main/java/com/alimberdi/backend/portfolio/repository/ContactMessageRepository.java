package com.alimberdi.backend.portfolio.repository;

import com.alimberdi.backend.portfolio.model.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, UUID> {

	long countByIsViewedFalse();

}
