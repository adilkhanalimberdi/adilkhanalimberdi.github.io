package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.ProjectCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.ProjectUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.ProjectResponse;
import com.alimberdi.backend.portfolio.exception.ProjectNotFoundException;
import com.alimberdi.backend.portfolio.mapper.ProjectMapper;
import com.alimberdi.backend.portfolio.model.entity.Project;
import com.alimberdi.backend.portfolio.model.enums.ProjectStatus;
import com.alimberdi.backend.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

	private final OrderIndexService orderIndexService;
	private final ProjectRepository repository;
	private final ProjectMapper mapper;

	public Page<ProjectResponse> getAll(Pageable pageable) {
		return repository.findAll(pageable)
				.map(mapper::toResponse);
	}

	public List<ProjectResponse> getAllSortedByOrderIndex() {
		return repository.findAllByOrderByOrderIndexAsc().stream()
				.map(mapper::toResponse)
				.toList();
	}

	@Transactional(rollbackFor = Exception.class)
	public ProjectResponse create(ProjectCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();
		Integer targetIndex = orderIndexService.resolve(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		Project project = mapper.toEntity(request);
		project.setOrderIndex(targetIndex);

		return mapper.toResponse(repository.save(project));
	}

	@Transactional(rollbackFor = Exception.class)
	public ProjectResponse update(UUID id, ProjectUpdateRequest request) {
		Project project = repository.findById(id)
				.orElseThrow(() -> new ProjectNotFoundException("Project with id " + id + " not found"));

		mapper.updateEntityFromDto(request, project);
		return mapper.toResponse(project);
	}

	@Transactional(rollbackFor = Exception.class)
	public void delete(UUID id) {
		repository.deleteById(id);
	}

}
