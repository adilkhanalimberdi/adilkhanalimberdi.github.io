import type {PageResponse} from "../../type/pagination.ts";
import type {AboutParagraphResponse} from "../../type/portfolio/portfolio.ts";
import {api} from "../api.ts";

export const AboutParagraphService = {
    async getAllAboutParagraphs(): Promise<PageResponse<AboutParagraphResponse>> {
        const response = await api.get("/about-paragraphs");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/about-paragraphs/${id}`);
    }
}