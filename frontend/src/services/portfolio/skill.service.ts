import {api} from "../api.ts";
import type {SkillByCategory, SkillCreateRequest, SkillResponse} from "../../type/portfolio/skill.ts";

export const SkillService = {
    async getAll(): Promise<SkillByCategory[]> {
        const response = await api.get("/skills");
        return response.data.data;
    },

    async create(request: SkillCreateRequest): Promise<SkillResponse> {
        const response = await api.post("/skills", request);
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/skills/${id}`);
    }
}