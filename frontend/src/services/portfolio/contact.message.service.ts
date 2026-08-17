import type {ContactMessage} from "../../type/portfolio/contact.message.ts";
import {api} from "../api.ts";

export const ContactMessageService = {
    async save(message: ContactMessage) {
        await api.post("/contact-message", message);
    }
}