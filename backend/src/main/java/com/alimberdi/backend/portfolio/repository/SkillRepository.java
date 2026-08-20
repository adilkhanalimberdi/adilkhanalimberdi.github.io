package com.alimberdi.backend.portfolio.repository;

import com.alimberdi.backend.portfolio.model.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SkillRepository extends JpaRepository<Skill, UUID> {

	List<Skill> findAllByOrderByOrderIndexAsc();

	@Modifying
	@Query(value = "UPDATE portfolio.skills s " +
			"SET order_index = s.order_index + 1 " +
			"FROM ( " +
			"	SELECT id FROM portfolio.skills " +
			"	WHERE order_index >= :startIndex " +
			"	ORDER BY order_index DESC" +
			") sub " +
			"WHERE s.id = sub.id",
			nativeQuery = true)
	void shiftIndexesUpFrom(@Param("startIndex") int startIndex);

	@Query("SELECT COALESCE(MAX(s.orderIndex), 0) FROM Skill s")
	Integer findMaxOrderIndex();

}
