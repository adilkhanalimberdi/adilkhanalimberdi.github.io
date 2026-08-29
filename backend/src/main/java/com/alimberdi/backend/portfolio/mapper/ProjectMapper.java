package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.request.ProjectCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.ProjectUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.ProjectResponse;
import com.alimberdi.backend.portfolio.model.entity.Project;
import org.mapstruct.*;

@Mapper(
		componentModel = MappingConstants.ComponentModel.SPRING,
		nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ProjectMapper {

	ProjectResponse toResponse(Project project);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	Project toEntity(ProjectCreateRequest request);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "orderIndex", ignore = true)
	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	void updateEntityFromDto(ProjectUpdateRequest request, @MappingTarget Project project);

}
