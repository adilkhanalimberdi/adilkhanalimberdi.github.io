import type {PageResponse} from "../../type/pagination.ts";
import {api} from "../api.ts";
import type {ProjectResponse} from "../../type/portfolio/project.ts";

export const ProjectService = {
    async getAllProjects(): Promise<PageResponse<ProjectResponse>> {
        const response = await api.get("/projects");
        return response.data.data;
    },

    async deleteById(id: string) {
        await api.delete(`/projects/${id}`);
    }
}