import {useEffect, useState} from "react";
import {ContactMessageService} from "../services/portfolio/contact.message.service.ts";
import {handleError} from "../utils/error.handler.ts";
import type {UnreadMessageCountResponse} from "../type/portfolio/contact.message.ts";

const DEFAULT_FETCH_ERROR_MESSAGE = "Failed to fetch unread message count.";

export const useUnreadCount = () => {
    const [unreadCount, setUnreadCount] = useState<number>(0);

    const fetchUnreadCount = async () => {
        try {
            const data: UnreadMessageCountResponse = await ContactMessageService.getUnreadCount();
            setUnreadCount(data.count);
        } catch (err) {
            handleError(err as Error, DEFAULT_FETCH_ERROR_MESSAGE);
        }
    };

    useEffect(() => {
        let isMount = true;

        const loadData = async () => {
            try {
                const data: UnreadMessageCountResponse = await ContactMessageService.getUnreadCount();
                if (isMount) {
                    setUnreadCount(data.count);
                }
            } catch (err) {
                handleError(err as Error, DEFAULT_FETCH_ERROR_MESSAGE);
            }
        };

        loadData().then();

        return () => {
            isMount = false;
        }
    }, []);

    return {
        unreadCount,
        setUnreadCount,
        refetchUnreadCount: fetchUnreadCount,
    }
}