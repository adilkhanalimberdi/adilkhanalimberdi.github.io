package com.alimberdi.backend.portfolio.model.entity;

import com.alimberdi.backend.portfolio.model.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "projects", schema = "portfolio")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;

	@Column(name = "image_url")
	private String imageUrl;

	private String url;

	@Enumerated(EnumType.STRING)
	private ProjectStatus status;

	@Column(name = "order_index", unique = true, nullable = false)
	private Integer orderIndex;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private Instant createdAt;

}
