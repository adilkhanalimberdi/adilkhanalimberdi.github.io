package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

	private final AboutParagraphService aboutParagraphService;
	private final EducationService educationService;
	private final ProjectService projectService;
	private final SkillService skillService;

	public PortfolioResponse getPortfolio() {
		List<AboutParagraphResponse> paragraphs = aboutParagraphService.getAllSortedByOrderIndex();
		List<EducationResponse> education = educationService.getAllSortedByOrderIndex();
		List<ProjectResponse> projects = projectService.getAllSortedByOrderIndex();
		List<SkillByCategory> skills = skillService.getAllSortedByOrderIndexGroupedByCategory();

		return new PortfolioResponse(
				paragraphs,
				education,
				projects,
				skills
		);
	}

}
