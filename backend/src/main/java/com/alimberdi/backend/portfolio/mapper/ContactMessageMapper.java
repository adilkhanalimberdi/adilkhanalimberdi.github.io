package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.contactMessage.ContactMessageResponse;
import com.alimberdi.backend.portfolio.model.entity.ContactMessage;
import org.springframework.stereotype.Component;

@Component
public class ContactMessageMapper {

	public ContactMessageResponse toResponse(final ContactMessage message) {
		return new ContactMessageResponse(
				message.getId(),
				message.getFullName(),
				message.getEmail(),
				message.getMessage(),
				message.getCreatedAt()
		);
	}

}
