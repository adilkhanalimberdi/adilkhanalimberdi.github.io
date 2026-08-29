package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.request.SkillCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.SkillUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.SkillResponse;
import com.alimberdi.backend.portfolio.model.entity.Skill;
import org.mapstruct.*;

@Mapper(
		componentModel = MappingConstants.ComponentModel.SPRING,
		nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface SkillMapper {

	SkillResponse toResponse(Skill skill);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	Skill toEntity(SkillCreateRequest request);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	void updateEntityFromDto(SkillUpdateRequest request, @MappingTarget Skill skill);

}