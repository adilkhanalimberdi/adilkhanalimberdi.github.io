package com.alimberdi.backend.portfolio.repository;

import com.alimberdi.backend.portfolio.model.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EducationRepository extends JpaRepository<Education, UUID> {

	List<Education> findAllByOrderByOrderIndexAsc();

	@Modifying
	@Query(value = "UPDATE portfolio.education e " +
			"SET order_index = e.order_index + 1 " +
			"FROM ( " +
			"	SELECT id FROM portfolio.education " +
			"	WHERE order_index >= :startIndex " +
			"	ORDER BY order_index DESC " +
			") sub " +
			"WHERE e.id = sub.id",
			nativeQuery = true)
	void shiftIndexesUpFrom(@Param("startIndex") int startIndex);

	@Query("SELECT COALESCE(MAX(e.orderIndex), 0) FROM Education e")
	Integer findMaxOrderIndex();

}
