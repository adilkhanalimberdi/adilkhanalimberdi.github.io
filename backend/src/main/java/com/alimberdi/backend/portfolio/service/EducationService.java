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
		Integer maxIndex = repository.findMaxOrderIndex();

		Integer targetIndex = orderIndexService.resolve(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		Education education = Education.builder()
				.institution(request.institution())
				.description(request.description())
				.location(request.location())
				.degree(request.degree())
				.speciality(request.speciality())
				.startDate(request.startDate())
				.endDate(request.endDate())
				.grade(request.grade())
				.status(request.status() != null ? request.status() : EducationStatus.COMPLETED)
				.url(request.url().trim().isBlank() ? null : request.url().trim())
				.orderIndex(targetIndex)
				.build();
		return mapper.toResponse(repository.save(education));
	}

	@Transactional(rollbackFor = Exception.class)
	public EducationResponse update(UUID id, EducationUpdateRequest request) {
		if (id == null) {
			throw new IllegalArgumentException("Id cannot be null");
		}

		Education education = repository.findById(id)
				.orElseThrow(() -> new EducationNotFoundException("Education with id " + id + " not found"));

		education.setInstitution(request.institution() != null ? request.institution() : education.getInstitution());
		education.setDescription(request.description() != null ? request.description() : education.getDescription());
		education.setLocation(request.location() != null ? request.location() : education.getLocation());
		education.setDegree(request.degree() != null ? request.degree() : education.getDegree());
		education.setSpeciality(request.speciality() != null ? request.speciality() : education.getSpeciality());
		education.setStartDate(request.startDate() != null ? request.startDate() : education.getStartDate());
		education.setEndDate(request.endDate() != null ? request.endDate() : education.getEndDate());
		education.setGrade(request.grade() != null ? request.grade() : education.getGrade());
		education.setStatus(request.status() != null ? request.status() : education.getStatus());
		education.setUrl(request.url() != null ? request.url() : education.getUrl());

		return mapper.toResponse(education);
	}

	@Transactional(rollbackFor = Exception.class)
	public void delete(UUID id) {
		if (id == null) {
			throw new IllegalArgumentException("Id cannot be null");
		}

		repository.deleteById(id);
	}

}
