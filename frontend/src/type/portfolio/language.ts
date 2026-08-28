export type LanguageLevel = "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native/Fluent" | "Native";

export type LanguageCreateRequest = {
    language: string;
    level: LanguageLevel;
}

export type LanguageUpdateRequest = {
    language?: string;
    level?: LanguageLevel;
}

export type LanguageResponse = {
    id: string;
    language: string;
    level: LanguageLevel;
    orderIndex: number;
    createdAt: Date;
}