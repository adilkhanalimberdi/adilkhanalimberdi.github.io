package com.alimberdi.backend.portfolio.model.enums;

public enum SkillCategory {
	PROGRAMMING("Programming"),
	BACKEND("Backend"),
	FRONTEND("Frontend"),
	DATABASE("Database"),
	TESTING("Testing"),
	DEVOPS("DevOps"),
	TOOLS("Tools");

	private final String title;

	SkillCategory(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return title;
	}
}
