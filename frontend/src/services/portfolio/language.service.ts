import type {LanguageResponse} from "../../type/portfolio/portfolio.ts";
import {api} from "../api.ts";

export const LanguageService = {
    async getAllLanguages(): Promise<LanguageResponse[]> {
        const response = await api.get("/languages");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/languages/${id}`);
    }
}