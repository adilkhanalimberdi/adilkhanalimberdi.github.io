package com.alimberdi.backend.portfolio.mapper;

import com.alimberdi.backend.portfolio.dto.request.ContactMessageCreateRequest;
import com.alimberdi.backend.portfolio.dto.response.ContactMessageResponse;
import com.alimberdi.backend.portfolio.model.entity.ContactMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
		componentModel = MappingConstants.ComponentModel.SPRING,
		nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ContactMessageMapper {

	@Mapping(source = "viewed", target = "isViewed")
	ContactMessageResponse toResponse(ContactMessage message);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "isViewed", ignore = true)
	ContactMessage toEntity(ContactMessageCreateRequest request);

}
