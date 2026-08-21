package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.LanguageCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.LanguageUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.LanguageResponse;
import com.alimberdi.backend.portfolio.exception.LanguageNotFoundException;
import com.alimberdi.backend.portfolio.mapper.LanguageMapper;
import com.alimberdi.backend.portfolio.model.entity.Language;
import com.alimberdi.backend.portfolio.repository.LanguageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LanguageService {

	private final OrderIndexService orderIndexService;
	private final LanguageRepository repository;
	private final LanguageMapper mapper;

	public List<LanguageResponse> getAllSortedByOrderIndex() {
		return repository.findAllByOrderByOrderIndexAsc().stream()
				.map(mapper::toResponse)
				.toList();
	}

	@Transactional(rollbackFor = Exception.class)
	public LanguageResponse create(LanguageCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();

		Integer targetIndex = orderIndexService.resolve(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		Language language = Language.builder()
				.language(request.language())
				.level(request.level())
				.orderIndex(targetIndex)
				.build();
		return mapper.toResponse(repository.save(language));
	}

	@Transactional(rollbackFor = Exception.class)
	public LanguageResponse update(UUID id, LanguageUpdateRequest request) {
		Language language = repository.findById(id)
				.orElseThrow(() -> new LanguageNotFoundException("Language with id " + id + " not found"));

		language.setLanguage(request.language() != null ? request.language() : language.getLanguage());
		language.setLevel(request.level() != null ? request.level() : language.getLevel());

		return mapper.toResponse(language);
	}

}
