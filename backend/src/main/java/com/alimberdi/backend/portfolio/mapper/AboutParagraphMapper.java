package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.response.AboutParagraphResponse;
import com.alimberdi.backend.portfolio.model.entity.AboutParagraph;
import org.springframework.stereotype.Component;

@Component
public class AboutParagraphMapper {

	public AboutParagraphResponse toResponse(AboutParagraph paragraph) {
		return new AboutParagraphResponse(
				paragraph.getId(),
				paragraph.getContent(),
				paragraph.getOrderIndex(),
				paragraph.getCreatedAt()
		);
	}

}
