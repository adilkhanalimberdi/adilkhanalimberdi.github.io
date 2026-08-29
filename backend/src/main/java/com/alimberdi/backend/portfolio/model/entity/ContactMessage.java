package com.alimberdi.backend.portfolio.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "contact_messages", schema = "portfolio")
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class ContactMessage {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private String fullName;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String message;

	@Builder.Default
	@Column(name = "is_viewed", nullable = false)
	private boolean isViewed = false;

	@Column(nullable = false, updatable = false)
	@CreatedDate
	private Instant createdAt;

}
