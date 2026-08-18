package com.alimberdi.backend.portfolio.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "about_paragraphs", schema = "portfolio")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class AboutParagraph {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@Column(name = "order_index", unique = true, nullable = false)
	private Integer orderIndex;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private Instant createdAt;

}
