package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.response.SkillResponse;
import com.alimberdi.backend.portfolio.model.entity.Skill;
import org.springframework.stereotype.Component;

@Component
public class SkillMapper {

	public SkillResponse toResponse(Skill skill) {
		return new SkillResponse(
				skill.getId(),
				skill.getCategory().toString(),
				skill.getSkill(),
				skill.getOrderIndex(),
				skill.getCreatedAt()
		);
	}

}
