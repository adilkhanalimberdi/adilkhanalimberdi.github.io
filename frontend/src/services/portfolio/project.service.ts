import type {PageResponse} from "../../type/pagination.ts";
import type {ProjectResponse} from "../../type/portfolio/portfolio.ts";
import {api} from "../api.ts";

export const ProjectService = {
    async getAllProjects(): Promise<PageResponse<ProjectResponse>> {
        const response = await api.get("/projects");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/projects/${id}`);
    }
}