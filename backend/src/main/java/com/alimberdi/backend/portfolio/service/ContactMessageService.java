package com.alimberdi.backend.portfolio.service;

import com.alimberdi.backend.portfolio.dto.request.ContactMessageCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.ContactMessageResponse;
import com.alimberdi.backend.portfolio.dto.response.UnreadMessageCountResponse;
import com.alimberdi.backend.portfolio.exception.ContactMessageNotFoundException;
import com.alimberdi.backend.portfolio.mapper.ContactMessageMapper;
import com.alimberdi.backend.portfolio.model.entity.ContactMessage;
import com.alimberdi.backend.portfolio.repository.ContactMessageRepository;
import com.alimberdi.backend.portfolio.service.notification.TelegramNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

	private final TelegramNotificationService telegramNotificationService;
	private final ContactMessageRepository repository;
	private final ContactMessageMapper mapper;

	public Page<ContactMessageResponse> getAll(Pageable pageable) {
		return repository.findAll(pageable)
				.map(mapper::toResponse);
	}

	public ContactMessageResponse getById(UUID id) {
		return repository.findById(id)
				.map(mapper::toResponse)
				.orElseThrow(() -> new ContactMessageNotFoundException("Contact message with id " + id + " not found"));
	}

	public UnreadMessageCountResponse getUnreadCount() {
		return new UnreadMessageCountResponse(
				repository.countByIsViewedFalse()
		);
	}

	@Transactional(rollbackFor = Exception.class)
	public void create(ContactMessageCreateRequest request) {
		ContactMessage message = ContactMessage.builder()
				.fullName(request.fullName())
				.email(request.email())
				.message(request.message())
				.isViewed(false)
				.build();

		telegramNotificationService.sendNotification(request.fullName(), request.email(), request.message());
		repository.save(message);
	}

	@Transactional(rollbackFor = Exception.class)
	public void toggleViewed(UUID id) {
		repository.toggleViewed(id);
	}

	@Transactional(rollbackFor = Exception.class)
	public void delete(UUID id) {
		if (id == null) {
			throw new IllegalArgumentException("Id cannot be null");
		}

		repository.deleteById(id);
	}

}
