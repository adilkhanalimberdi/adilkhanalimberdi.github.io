package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.response.LanguageResponse;
import com.alimberdi.backend.portfolio.model.entity.Language;
import org.springframework.stereotype.Component;

@Component
public class LanguageMapper {

	public LanguageResponse toResponse(Language language) {
		return new LanguageResponse(
				language.getId(),
				language.getLanguage(),
				language.getLevel(),
				language.getOrderIndex(),
				language.getCreatedAt()
		);
	}

}
