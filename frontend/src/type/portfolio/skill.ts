export type SkillCategory = "PROGRAMMING" | "BACKEND" | "FRONTEND" | "DATABASE" | "TESTING" | "DEVOPS" | "TOOLS";

export type SkillCreateRequest = {
    category: SkillCategory;
    content: string;
}

export type SkillUpdateRequest = {
    category?: SkillCategory;
    content?: string;
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