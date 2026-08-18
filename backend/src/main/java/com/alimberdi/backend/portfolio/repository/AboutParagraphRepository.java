package com.alimberdi.backend.portfolio.repository;

import com.alimberdi.backend.portfolio.model.entity.AboutParagraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AboutParagraphRepository extends JpaRepository<AboutParagraph, UUID> {

	List<AboutParagraph> findAllByOrderByOrderIndexAsc();

	@Modifying
	@Query(value = "UPDATE portfolio.about_paragraphs p " +
			"SET order_index = p.order_index + 1 " +
			"FROM ( " +
			"    SELECT id FROM portfolio.about_paragraphs " +
			"    WHERE order_index >= :startIndex " +
			"    ORDER BY order_index DESC " +
			") sub " +
			"WHERE p.id = sub.id",
			nativeQuery = true)
	void shiftIndexesUpFrom(@Param("startIndex") int startIndex);

	@Query("SELECT COALESCE(MAX(p.orderIndex), 0) FROM AboutParagraph p")
	Integer findMaxOrderIndex();

}
