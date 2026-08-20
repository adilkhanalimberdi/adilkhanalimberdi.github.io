package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.EducationCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.EducationResponse;
import com.alimberdi.backend.portfolio.mapper.EducationMapper;
import com.alimberdi.backend.portfolio.model.entity.Education;
import com.alimberdi.backend.portfolio.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EducationService {

	private final OrderIndexService orderIndexService;
	private final EducationRepository repository;
	private final EducationMapper mapper;

	@Transactional(rollbackFor = Exception.class)
	public EducationResponse create(EducationCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();

		Integer targetIndex = orderIndexService.resolveTargetIndex(
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
				.url(request.url())
				.orderIndex(targetIndex)
				.build();
		return mapper.toResponse(repository.save(education));
	}

}
