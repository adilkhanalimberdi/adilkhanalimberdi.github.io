export type AboutParagraphResponse = {
    id: string;
    content: string;
    orderIndex: number;
    createdAt: Date
}

export type YearMonth = {
    year: number,
    month: number
}

export type EducationStatus = "IN_PROGRESS" | "COMPLETED";

export type EducationResponse = {
    id: string;
    institution: string;
    description?: string;
    location: string;
    degree: string;
    speciality: string;
    startDate: string;
    endDate?: string;
    grade?: number;
    status: EducationStatus;
    url?: string;
    orderIndex: number;
    createdAt: Date;
}

export type ProjectStatus = "IN_PROGRESS" | "COMPLETED" | "PAUSED" | "ARCHIVED";

export type ProjectResponse = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    url?: string;
    status: ProjectStatus;
    orderIndex: number;
    createdAt: Date;
}

export type SkillByCategory = {
    category: string;
    content: SkillResponse[];
}

export type SkillResponse = {
    id: string;
    category: string;
    content: string;
    orderIndex: number;
    createdAt: Date;
}

export type LanguageLevel = "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native/Fluent" | "Native";

export type LanguageResponse = {
    id: string;
    language: string;
    level: LanguageLevel;
    orderIndex: number;
    createdAt: Date;
}

export type PortfolioResponse = {
    about: AboutParagraphResponse[];
    education: EducationResponse[];
    projects: ProjectResponse[];
    skills: SkillByCategory[];
    languages: LanguageResponse[];
}