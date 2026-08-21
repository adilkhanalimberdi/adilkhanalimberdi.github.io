package com.alimberdi.backend.portfolio.model.enums;

public enum LanguageLevel {
	BEGINNER("Beginner"),
	INTERMEDIATE("Intermediate"),
	ADVANCED("Advanced"),
	FLUENT("Fluent"),
	NATIVE_FLUENT("Native/Fluent"),
	NATIVE("Native"),;

	private String title;

	LanguageLevel(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return title;
	}
}
