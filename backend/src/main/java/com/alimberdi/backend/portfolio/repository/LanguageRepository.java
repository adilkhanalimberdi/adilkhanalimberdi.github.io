package com.alimberdi.backend.portfolio.repository;

import com.alimberdi.backend.portfolio.model.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LanguageRepository extends JpaRepository<Language, UUID> {

	List<Language> findAllByOrderByOrderIndexAsc();

	@Modifying
	@Query(value = "UPDATE portfolio.languages l " +
			"SET order_index = l.order_index + 1 " +
			"FROM ( " +
			"	SELECT id FROM portfolio.languages " +
			"	WHERE order_index >= :startIndex " +
			"	ORDER BY order_index DESC" +
			") sub " +
			"WHERE l.id = sub.id ", nativeQuery = true)
	void shiftIndexesUpFrom(@Param("startIndex") int startIndex);

	@Query("SELECT COALESCE(MAX(l.orderIndex), 0) FROM Language l")
	Integer findMaxOrderIndex();

}
