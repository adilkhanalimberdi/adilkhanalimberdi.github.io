package com.alimberdi.backend.portfolio.model.entity;

import com.alimberdi.backend.portfolio.model.enums.SkillCategory;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "skills", schema = "portfolio")
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class Skill {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SkillCategory category;

	@Column(nullable = false)
	private String content;

	@Column(name = "order_index", unique = true, nullable = false)
	private Integer orderIndex;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private Instant createdAt;

}
