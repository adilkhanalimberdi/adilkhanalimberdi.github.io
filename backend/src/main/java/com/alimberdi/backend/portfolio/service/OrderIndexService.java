package com.alimberdi.backend.portfolio.service;

import org.springframework.stereotype.Component;

@Component
public class OrderIndexService {

	public Integer resolve(
			Integer requestedIndex,
			Integer maxIndex,
			Runnable shiftIndexes
	) {
		if (requestedIndex == null || requestedIndex > maxIndex || requestedIndex < 0) {
			return maxIndex + 1;
		}

		shiftIndexes.run();
		return requestedIndex;
	}

}
