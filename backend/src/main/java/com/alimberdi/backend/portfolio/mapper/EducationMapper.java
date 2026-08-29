package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.request.EducationCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.EducationUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.EducationResponse;
import com.alimberdi.backend.portfolio.model.entity.Education;
import org.mapstruct.*;

import java.util.List;

@Mapper(
		componentModel = MappingConstants.ComponentModel.SPRING,
		nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface EducationMapper {

	EducationResponse toResponse(Education education);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	@Mapping(target = "url", expression = "java(cleanUrl(request.url()))")
	Education toEntity(EducationCreateRequest request);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	@Mapping(target = "url", expression = "java(request.url() != null ? cleanUrl(request.url()) : education.getUrl())")
	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	void updateEntityFromDto(EducationUpdateRequest request, @MappingTarget Education education);

	default String cleanUrl(String url) {
		if (url == null || url.isBlank()) {
			return null;
		}
		return url.trim();
	}

}
