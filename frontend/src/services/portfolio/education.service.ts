import type {PageResponse} from "../../type/pagination.ts";
import type {EducationResponse} from "../../type/portfolio/portfolio.ts";
import {api} from "../api.ts";

export const EducationService = {
    async getAllEducation(): Promise<PageResponse<EducationResponse>> {
        const response = await api.get("/educations");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/educations/${id}`);
    }
}