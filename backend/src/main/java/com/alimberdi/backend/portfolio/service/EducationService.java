package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.EducationCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.EducationUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.EducationResponse;
import com.alimberdi.backend.portfolio.exception.EducationNotFoundException;
import com.alimberdi.backend.portfolio.mapper.EducationMapper;
import com.alimberdi.backend.portfolio.model.entity.Education;
import com.alimberdi.backend.portfolio.model.enums.EducationStatus;
import com.alimberdi.backend.portfolio.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EducationService {

	private final OrderIndexService orderIndexService;
	private final EducationRepository repository;
	private final EducationMapper mapper;

	public Page<EducationResponse> getAll(Pageable pageable) {
		return repository.findAll(pageable)
				.map(mapper::toResponse);
	}

	public List<EducationResponse> getAllSortedByOrderIndex() {
		return repository.findAllByOrderByOrderIndexAsc().stream()
				.map(mapper::toResponse)
				.toList();
	}

	@Transactional(rollbackFor = Exception.class)
	public EducationResponse create(EducationCreateRequest request) {
		if (request.endDate() != null && request.startDate().isAfter(request.endDate())) {
			throw new IllegalArgumentException("Start date cannot be after end date.");
		}

		Integer maxIndex = repository.findMaxOrderIndex();
		Integer targetIndex = orderIndexService.resolve(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		Education education = mapper.toEntity(request);
		education.setOrderIndex(targetIndex);

		if (education.getStatus() == null) {
			education.setStatus(EducationStatus.COMPLETED);
		}
		return mapper.toResponse(repository.save(education));
	}

	@Transactional(rollbackFor = Exception.class)
	public EducationResponse update(UUID id, EducationUpdateRequest request) {
		Education education = repository.findById(id)
				.orElseThrow(() -> new EducationNotFoundException("Education with id " + id + " not found"));

		mapper.updateEntityFromDto(request, education);

		if (education.getEndDate() != null && education.getStartDate().isAfter(education.getEndDate())) {
			throw new IllegalArgumentException("Start date cannot be after end date.");
		}
		return mapper.toResponse(education);
	}

	@Transactional(rollbackFor = Exception.class)
	public void delete(UUID id) {
		repository.deleteById(id);
	}

}
