import type {PortfolioResponse} from "../../type/portfolio/portfolio.ts";
import {api} from "../api.ts";

export const PortfolioService = {
    async get(): Promise<PortfolioResponse> {
        const response = await api.get("/portfolio");
        return response.data.data;
    }
}