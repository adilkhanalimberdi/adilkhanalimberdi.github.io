import {api} from "../api.ts";
import type {LanguageResponse} from "../../type/portfolio/language.ts";

export const LanguageService = {
    async getAll(): Promise<LanguageResponse[]> {
        const response = await api.get("/languages");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/languages/${id}`);
    }
}