import type {ContactMessageCreateRequest} from "../../type/portfolio/contact.message.ts";
import {api} from "../api.ts";

export const ContactMessageService = {
    async save(message: ContactMessageCreateRequest) {
        await api.post("/contact-messages", message);
    }
}