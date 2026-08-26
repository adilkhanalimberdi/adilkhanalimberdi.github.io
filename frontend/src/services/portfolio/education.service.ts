import type {PageResponse} from "../../type/pagination.ts";
import {api} from "../api.ts";
import type {EducationResponse} from "../../type/portfolio/education.ts";

export const EducationService = {
    async getAll(): Promise<PageResponse<EducationResponse>> {
        const response = await api.get("/educations");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/educations/${id}`);
    }
}