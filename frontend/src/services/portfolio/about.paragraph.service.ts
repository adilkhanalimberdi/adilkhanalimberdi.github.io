import type {PageResponse} from "../../type/pagination.ts";
import type {
    AboutParagraphCreateRequest,
    AboutParagraphResponse,
    AboutParagraphUpdateRequest
} from "../../type/portfolio/about.paragraph.ts";
import {api} from "../api.ts";

export const AboutParagraphService = {
    async getAll(): Promise<PageResponse<AboutParagraphResponse>> {
        const response = await api.get("/about-paragraphs");
        return response.data.data;
    },

    async create(request: AboutParagraphCreateRequest): Promise<AboutParagraphResponse> {
        const response = await api.post("/about-paragraphs", request);
        return response.data.data;
    },

    async update(id: string, request: AboutParagraphUpdateRequest): Promise<AboutParagraphResponse> {
        const response = await api.patch(`/about-paragraphs/${id}`, request);
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/about-paragraphs/${id}`);
    }
}