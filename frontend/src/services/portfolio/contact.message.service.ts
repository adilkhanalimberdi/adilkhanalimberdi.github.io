import type {ContactMessageCreateRequest} from "../../type/portfolio/contact.message.ts";
import {api} from "../api.ts";

export const ContactMessageService = {
    async getAll() {
        const response = await api.get("/messages");
        return response.data.data;
    },

    async getUnreadCount() {
        const response = await api.get("/messages/unread-count");
        return response.data.data;
    },

    async save(message: ContactMessageCreateRequest) {
        await api.post("/messages", message);
    },

    async toggleViewed(id: string) {
        await api.patch(`/messages/${id}/toggle`);
    },

    async deleteById(id: string) {
        await api.delete(`/messages/${id}`);
    }
}