package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.SkillCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.SkillUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.SkillByCategory;
import com.alimberdi.backend.portfolio.dto.response.SkillResponse;
import com.alimberdi.backend.portfolio.exception.SkillNotFoundException;
import com.alimberdi.backend.portfolio.mapper.SkillMapper;
import com.alimberdi.backend.portfolio.model.entity.Skill;
import com.alimberdi.backend.portfolio.model.enums.SkillCategory;
import com.alimberdi.backend.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {

	private final OrderIndexService orderIndexService;
	private final SkillRepository repository;
	private final SkillMapper mapper;

	public List<SkillByCategory> getAllSortedByOrderIndexGroupedByCategory() {
		return repository.findAllByOrderByOrderIndexAsc().stream()
				.collect(Collectors.groupingBy(
						Skill::getCategory,
						() -> new EnumMap<>(SkillCategory.class),
						Collectors.mapping(mapper::toResponse, Collectors.toList())
				))
				.entrySet().stream()
				.map(entry -> new SkillByCategory(entry.getKey(), entry.getValue()))
				.toList();
	}

	@Transactional(rollbackFor = Exception.class)
	public SkillResponse create(SkillCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();
		Integer targetIndex = orderIndexService.resolve(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		Skill skill = mapper.toEntity(request);
		skill.setOrderIndex(targetIndex);

		return mapper.toResponse(repository.save(skill));
	}

	@Transactional(rollbackFor = Exception.class)
	public SkillResponse update(UUID id, SkillUpdateRequest request) {
		Skill skill = repository.findById(id)
				.orElseThrow(() -> new SkillNotFoundException("Skill with id " + id + " not found"));

		mapper.updateEntityFromDto(request, skill);
		return mapper.toResponse(skill);
	}

	@Transactional(rollbackFor = Exception.class)
	public void delete(UUID id) {
		repository.deleteById(id);
	}

}
