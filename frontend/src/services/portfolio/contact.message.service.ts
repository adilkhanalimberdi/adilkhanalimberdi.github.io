import type {ContactMessageCreateRequest} from "../../type/portfolio/contact.message.ts";
import {api} from "../api.ts";

export const ContactMessageService = {
    async getAllContactMessages() {
        const response = await api.get("/contact-messages");
        return response.data.data;
    },

    async save(message: ContactMessageCreateRequest) {
        await api.post("/contact-messages", message);
    },

    async deleteById(id: string) {
        await api.delete(`/contact-messages/${id}`);
    }
}