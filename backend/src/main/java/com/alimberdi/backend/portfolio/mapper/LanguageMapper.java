package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.request.LanguageCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.LanguageUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.LanguageResponse;
import com.alimberdi.backend.portfolio.model.entity.Language;
import org.mapstruct.*;

@Mapper(
		componentModel = MappingConstants.ComponentModel.SPRING,
		nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface LanguageMapper {

	LanguageResponse toResponse(Language language);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	Language toEntity(LanguageCreateRequest request);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	void updateEntityFromDto(LanguageUpdateRequest request, @MappingTarget Language language);

}
