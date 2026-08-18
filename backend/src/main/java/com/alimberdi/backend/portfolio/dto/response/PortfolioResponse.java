package com.alimberdi.backend.portfolio.dto.response;

import java.util.List;

public record PortfolioResponse(
		List<AboutParagraphResponse> about
) {}

/*
data: {
	about: {
		{
			id: 1afb452dn...,
			content: "My name is Adilkhan, and I'm ...",
			orderIndex: 1,
			createdAt: "2026-05-05 15:21:41.04143Z"
		},
		{
			id: 53kea13l4...,
			content: "I am a third-year ...",
			orderIndex: 2,
			createdAt: "2026-05-05 15:21:41.04143Z"
		},
		...
	}
}
*/