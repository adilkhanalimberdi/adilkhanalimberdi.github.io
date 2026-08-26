import {useCallback, useEffect, useState} from "react";
import type {LanguageResponse} from "../type/portfolio/language.ts";
import {LanguageService} from "../services/portfolio/language.service.ts";
import {handleError} from "../utils/error.handler.ts";

const DEFAULT_FETCH_ERROR_MESSAGE = "Failed to fetch languages.";

export const useLanguages = () => {
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await LanguageService.getAll();
            setLanguages(data);
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
                const data = await LanguageService.getAll();
                if (isMounted) {
                    setLanguages(data);
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
        languages,
        setLanguages,
        isLoading,
        refetch,
    }
}