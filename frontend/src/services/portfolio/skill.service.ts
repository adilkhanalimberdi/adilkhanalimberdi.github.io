import type {SkillByCategory} from "../../type/portfolio/portfolio.ts";
import {api} from "../api.ts";

export const SkillService = {
    async getAllSkills(): Promise<SkillByCategory[]> {
        const response = await api.get("/skills");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/skills/${id}`);
    }
}