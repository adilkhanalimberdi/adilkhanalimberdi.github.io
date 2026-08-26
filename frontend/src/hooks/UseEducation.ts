import {useCallback, useEffect, useState} from "react";
import type {PageResponse} from "../type/pagination.ts";
import type {EducationResponse} from "../type/portfolio/education.ts";
import {EducationService} from "../services/portfolio/education.service.ts";
import {handleError} from "../utils/error.handler.ts";

const DEFAULT_FETCH_ERROR_MESSAGE = "Failed to fetch education.";

export const useEducation = () => {
    const [education, setEducation] = useState<PageResponse<EducationResponse> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await EducationService.getAll();
            setEducation(data);
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
                const data = await EducationService.getAll();
                if (isMounted) {
                    setEducation(data);
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
        education,
        setEducation,
        isLoading,
        refetch,
    }
}