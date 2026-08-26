import {api} from "../api.ts";
import type {SkillByCategory} from "../../type/portfolio/skill.ts";

export const SkillService = {
    async getAll(): Promise<SkillByCategory[]> {
        const response = await api.get("/skills");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/skills/${id}`);
    }
}