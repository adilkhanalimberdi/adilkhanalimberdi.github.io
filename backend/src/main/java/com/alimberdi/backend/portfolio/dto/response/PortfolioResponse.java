package com.alimberdi.backend.portfolio.dto.response;

import java.util.List;

public record PortfolioResponse(
		List<AboutParagraphResponse> about,
		List<EducationResponse> education,
		List<ProjectResponse> projects,
		List<SkillByCategory> skills
) {}