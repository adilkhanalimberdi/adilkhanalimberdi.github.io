import {api} from "../api.ts";
import type {AdminLoginRequest} from "../../type/portfolio/auth.ts";

export const AdminService = {
    async login(request: AdminLoginRequest) {
        const response = await api.post("/auth/admin/login", request);
        return response.data.data;
    }
}