import {useCallback, useEffect, useState} from "react";
import type {PageResponse} from "../type/pagination.ts";
import type {AboutParagraphResponse} from "../type/portfolio/about.paragraph.ts";
import {AboutParagraphService} from "../services/portfolio/about.paragraph.service.ts";
import {handleError} from "../utils/error.handler.ts";

const DEFAULT_FETCH_ERROR_MESSAGE = "Failed to fetch paragraphs.";

export const useAboutParagraphs = () => {
    const [paragraphs, setParagraphs] = useState<PageResponse<AboutParagraphResponse> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await AboutParagraphService.getAll();
            setParagraphs(data);
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
                const data = await AboutParagraphService.getAll();
                if (isMounted) {
                    setParagraphs(data);
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
        };
    }, []);

    return {
        paragraphs,
        setParagraphs,
        isLoading,
        refetch,
    };
}