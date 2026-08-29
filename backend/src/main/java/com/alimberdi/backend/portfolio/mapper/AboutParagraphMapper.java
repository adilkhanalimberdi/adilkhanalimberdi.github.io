package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.request.AboutParagraphCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.AboutParagraphUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.AboutParagraphResponse;
import com.alimberdi.backend.portfolio.model.entity.AboutParagraph;
import org.mapstruct.*;

import java.util.List;

@Mapper(
		componentModel = MappingConstants.ComponentModel.SPRING,
		nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface AboutParagraphMapper {

	AboutParagraphResponse toResponse(AboutParagraph paragraph);

	List<AboutParagraphResponse> toResponseList(List<AboutParagraph> paragraphs);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	AboutParagraph toEntity(AboutParagraphCreateRequest request);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	void updateEntityFromDto(AboutParagraphUpdateRequest request, @MappingTarget AboutParagraph paragraph);

}