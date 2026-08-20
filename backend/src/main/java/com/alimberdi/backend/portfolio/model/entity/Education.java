package com.alimberdi.backend.portfolio.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.YearMonth;
import java.util.UUID;

@Entity
@Table(name = "education", schema = "portfolio")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Education {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private String institution;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;

	@Column(nullable = false)
	private String location;

	@Column(nullable = false)
	private String degree;

	@Column(nullable = false)
	private String speciality;

	@Column(name = "start_date", nullable = false)
	private YearMonth startDate;

	@Column(name = "end_date")
	private YearMonth endDate;

	private BigDecimal grade;

	private String url;

	@Column(name = "order_index", unique = true, nullable = false)
	private Integer orderIndex;

	@CreatedDate
	@Column(nullable = false, updatable = false)
	private Instant createdAt;

}
