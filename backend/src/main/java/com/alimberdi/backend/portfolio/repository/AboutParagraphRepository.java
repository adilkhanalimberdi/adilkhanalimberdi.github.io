package com.alimberdi.backend.portfolio.repository;

import com.alimberdi.backend.portfolio.model.entity.AboutParagraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AboutParagraphRepository extends JpaRepository<AboutParagraph, UUID> {

	Optional<AboutParagraph> findByOrderIndex(Integer orderIndex);

	List<AboutParagraph> findAllByOrderByOrderIndexAsc();

	@Modifying
	@Query("UPDATE AboutParagraph p SET p.orderIndex = p.orderIndex + 1 WHERE p.orderIndex >= :startIndex")
	void shiftOrderIndexesFrom(@Param("startIndex") Integer startIndex);

	@Query("SELECT COALESCE(MAX(p.orderIndex), 0) FROM AboutParagraph p")
	Integer findMaxOrderIndex();

}
