import {api} from "../api.ts";
import type {LanguageCreateRequest, LanguageResponse} from "../../type/portfolio/language.ts";

export const LanguageService = {
    async getAll(): Promise<LanguageResponse[]> {
        const response = await api.get("/languages");
        return response.data.data;
    },

    async create(request: LanguageCreateRequest): Promise<LanguageResponse> {
        const response = await api.post("/languages", request);
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/languages/${id}`);
    }
}