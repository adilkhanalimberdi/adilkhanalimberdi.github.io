package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.AboutParagraphCreateRequest;
import com.alimberdi.backend.portfolio.dto.request.AboutParagraphUpdateRequest;
import com.alimberdi.backend.portfolio.dto.response.AboutParagraphResponse;
import com.alimberdi.backend.portfolio.exception.AboutParagraphNotFoundException;
import com.alimberdi.backend.portfolio.mapper.AboutParagraphMapper;
import com.alimberdi.backend.portfolio.model.entity.AboutParagraph;
import com.alimberdi.backend.portfolio.repository.AboutParagraphRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AboutParagraphService {

	private final OrderIndexService orderIndexService;
	private final AboutParagraphRepository repository;
	private final AboutParagraphMapper mapper;

	public Page<AboutParagraphResponse> getAll(Pageable pageable) {
		return repository.findAll(pageable)
				.map(mapper::toResponse);
	}

	public List<AboutParagraphResponse> getAllSortedByOrderIndex() {
		return mapper.toResponseList(repository.findAllByOrderByOrderIndexAsc());
	}

	@Transactional(rollbackFor = Exception.class)
	public AboutParagraphResponse create(AboutParagraphCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();
		Integer targetIndex = orderIndexService.resolve(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		AboutParagraph paragraph = mapper.toEntity(request);
		paragraph.setOrderIndex(targetIndex);

		return mapper.toResponse(repository.save(paragraph));
	}

	@Transactional(rollbackFor = Exception.class)
	public AboutParagraphResponse update(UUID id, AboutParagraphUpdateRequest request) {
		AboutParagraph paragraph = repository.findById(id)
				.orElseThrow(() -> new AboutParagraphNotFoundException("About paragraph with id " + id + " not found"));

		mapper.updateEntityFromDto(request, paragraph);
		return mapper.toResponse(paragraph);
	}

	@Transactional(rollbackFor = Exception.class)
	public void delete(UUID id) {
		repository.deleteById(id);
	}

}
