package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.SkillCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.SkillResponse;
import com.alimberdi.backend.portfolio.mapper.SkillMapper;
import com.alimberdi.backend.portfolio.model.entity.Skill;
import com.alimberdi.backend.portfolio.model.enums.SkillCategory;
import com.alimberdi.backend.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillService {

	private final OrderIndexService orderIndexService;
	private final SkillRepository repository;
	private final SkillMapper mapper;

	public SkillResponse create(SkillCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();

		Integer targetIndex = orderIndexService.resolveTargetIndex(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		Skill skill = Skill.builder()
				.category(request.category())
				.skill(request.skill())
				.orderIndex(targetIndex)
				.build();
		return mapper.toResponse(repository.save(skill));
	}

}
