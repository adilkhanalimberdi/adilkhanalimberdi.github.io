package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.ProjectCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.ProjectResponse;
import com.alimberdi.backend.portfolio.mapper.ProjectMapper;
import com.alimberdi.backend.portfolio.model.entity.Project;
import com.alimberdi.backend.portfolio.model.enums.ProjectStatus;
import com.alimberdi.backend.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {

	private final OrderIndexService orderIndexService;
	private final ProjectRepository repository;
	private final ProjectMapper mapper;

	public ProjectResponse create(ProjectCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();

		Integer targetIndex = orderIndexService.resolveTargetIndex(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		Project project = Project.builder()
				.title(request.title())
				.description(request.description())
				.status(request.status() != null ? request.status() : ProjectStatus.COMPLETED)
				.orderIndex(targetIndex)
				.build();
		return mapper.toResponse(repository.save(project));
	}

}
