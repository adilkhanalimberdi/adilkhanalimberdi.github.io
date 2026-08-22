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
		return repository.findAllByOrderByOrderIndexAsc()
				.stream()
				.map(mapper::toResponse)
				.toList();
	}

	@Transactional(rollbackFor = Exception.class)
	public AboutParagraphResponse create(AboutParagraphCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();

		Integer targetIndex = orderIndexService.resolve(
				request.orderIndex(),
				maxIndex,
				() -> repository.shiftIndexesUpFrom(request.orderIndex())
		);

		AboutParagraph paragraph = AboutParagraph.builder()
				.content(request.content())
				.orderIndex(targetIndex)
				.build();
		return mapper.toResponse(repository.save(paragraph));
	}

	@Transactional(rollbackFor = Exception.class)
	public AboutParagraphResponse update(UUID id, AboutParagraphUpdateRequest request) {
		if (id == null) {
			throw new IllegalArgumentException("Id cannot be null");
		}

		AboutParagraph paragraph = repository.findById(id)
				.orElseThrow(() -> new AboutParagraphNotFoundException("About paragraph with id " + id + " not found"));

		paragraph.setContent(request.content() != null ? request.content() : paragraph.getContent());
		return mapper.toResponse(paragraph);
	}

	@Transactional(rollbackFor = Exception.class)
	public void delete(UUID id) {
		if (id == null) {
			throw new IllegalArgumentException("Id cannot be null");
		}

		repository.deleteById(id);
	}

}
