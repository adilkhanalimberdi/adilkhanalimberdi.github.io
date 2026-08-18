package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.AboutParagraphCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.AboutParagraphResponse;
import com.alimberdi.backend.portfolio.mapper.AboutParagraphMapper;
import com.alimberdi.backend.portfolio.model.entity.AboutParagraph;
import com.alimberdi.backend.portfolio.repository.AboutParagraphRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AboutParagraphService {

	private final AboutParagraphRepository repository;
	private final AboutParagraphMapper mapper;

	public List<AboutParagraphResponse> getAllSortedByOrderIndex() {
		return repository.findAllByOrderByOrderIndexAsc()
				.stream()
				.map(mapper::toResponse)
				.toList();
	}

	@Transactional(rollbackFor = Exception.class)
	public AboutParagraphResponse create(AboutParagraphCreateRequest request) {
		Integer maxIndex = repository.findMaxOrderIndex();
		Integer targetIndex = request.orderIndex();

		if (targetIndex == null || targetIndex > maxIndex) {
			targetIndex = maxIndex + 1;
		} else {
			repository.shiftOrderIndexesFrom(targetIndex);
		}

		AboutParagraph paragraph = AboutParagraph.builder()
				.content(request.content())
				.orderIndex(targetIndex)
				.build();
		return mapper.toResponse(repository.save(paragraph));
	}

}
