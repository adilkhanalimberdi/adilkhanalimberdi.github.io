import axios from "axios";
import toast from "react-hot-toast";
import type {ErrorResponse} from "../type/error.ts";

export function handleError(error: Error, defaultMessage: string = "Internal Server Error") {
    if (axios.isAxiosError(error)) {
        const err: ErrorResponse = error.response?.data;

        if (err.errors) {
            Object.values(err.errors).forEach((message) => {
                toast.error(message)
            });
            return;
        }

        toast.error(err.message || defaultMessage);
    } else {
        toast.error(defaultMessage);
    }
}