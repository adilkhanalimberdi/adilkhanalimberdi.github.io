package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.response.ProjectResponse;
import com.alimberdi.backend.portfolio.model.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

	public ProjectResponse toResponse(Project project) {
		return new ProjectResponse(
				project.getId(),
				project.getTitle(),
				project.getDescription(),
				project.getImageUrl(),
				project.getUrl(),
				project.getStatus(),
				project.getOrderIndex(),
				project.getCreatedAt()
		);
	}

}
