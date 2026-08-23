import {api} from "../api.ts";
import type {AdminLoginRequest} from "../../type/portfolio/auth.ts";
import type {
    AboutParagraphResponse,
    EducationResponse, LanguageResponse,
    ProjectResponse,
    SkillByCategory
} from "../../type/portfolio/portfolio.ts";
import type {PageResponse} from "../../type/pagination.ts";

export const AdminService = {
    async getAllContactMessages() {
        const response = await api.get("/contact-messages");
        return response.data.data;
    },

    async getAllAboutParagraphs(): Promise<PageResponse<AboutParagraphResponse>> {
        const response = await api.get("/about-paragraphs");
        return response.data.data;
    },

    async getAllEducation(): Promise<PageResponse<EducationResponse>> {
        const response = await api.get("/educations");
        return response.data.data;
    },

    async getAllProjects(): Promise<PageResponse<ProjectResponse>> {
        const response = await api.get("/projects");
        return response.data.data;
    },

    async getAllSkills(): Promise<SkillByCategory[]> {
        const response = await api.get("/skills");
        return response.data.data;
    },

    async getAllLanguages(): Promise<LanguageResponse[]> {
        const response = await api.get("/languages");
        return response.data.data;
    },

    async login(request: AdminLoginRequest) {
        const response = await api.post("/auth/admin/login", request);
        return response.data.data;
    }
}