import type {PageResponse} from "../type/pagination.ts";
import type {ContactMessageResponse} from "../type/portfolio/contact.message.ts";
import {useCallback, useEffect, useState} from "react";
import {ContactMessageService} from "../services/portfolio/contact.message.service.ts";
import {handleError} from "../utils/error.handler.ts";

const DEFAULT_FETCH_ERROR_MESSAGE = "Failed to fetch messages.";

export const useContactMessages = () => {
    const [messages, setMessages] = useState<PageResponse<ContactMessageResponse> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await ContactMessageService.getAll();
            setMessages(data);
        } catch (err) {
            handleError(err as Error, DEFAULT_FETCH_ERROR_MESSAGE);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await ContactMessageService.getAll();
                if (isMounted) {
                    setMessages(data);
                }
            } catch (err) {
                handleError(err as Error, DEFAULT_FETCH_ERROR_MESSAGE);
            } finally {
                setIsLoading(false);
            }
        };

        loadData().then();

        return () => {
            isMounted = false;
        }
    }, []);

    return {
        messages,
        setMessages,
        isLoading,
        refetch,
    }
}