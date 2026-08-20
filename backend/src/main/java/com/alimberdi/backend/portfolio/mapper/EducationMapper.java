package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.response.EducationResponse;
import com.alimberdi.backend.portfolio.model.entity.Education;
import org.springframework.stereotype.Component;

@Component
public class EducationMapper {

	public EducationResponse toResponse(Education education) {
		return new EducationResponse(
				education.getId(),
				education.getInstitution(),
				education.getDescription(),
				education.getLocation(),
				education.getDegree(),
				education.getSpeciality(),
				education.getStartDate(),
				education.getEndDate(),
				education.getGrade(),
				education.getUrl(),
				education.getOrderIndex(),
				education.getCreatedAt()
		);
	}

}
