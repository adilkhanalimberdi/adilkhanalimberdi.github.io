import type {PageResponse} from "../../type/pagination.ts";
import {api} from "../api.ts";
import type {EducationCreateRequest, EducationResponse} from "../../type/portfolio/education.ts";

export const EducationService = {
    async getAll(): Promise<PageResponse<EducationResponse>> {
        const response = await api.get("/educations");
        return response.data.data;
    },

    async create(request: EducationCreateRequest): Promise<EducationResponse> {
        const response = await api.post("/educations", request);
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/educations/${id}`);
    }
}