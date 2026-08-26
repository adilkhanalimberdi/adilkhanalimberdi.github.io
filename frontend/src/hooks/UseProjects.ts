import {useCallback, useEffect, useState} from "react";
import type {PageResponse} from "../type/pagination.ts";
import type {ProjectResponse} from "../type/portfolio/project.ts";
import {ProjectService} from "../services/portfolio/project.service.ts";
import {handleError} from "../utils/error.handler.ts";

const DEFAULT_FETCH_ERROR_MESSAGE = "Failed to fetch projects.";

export const useProjects = () => {
    const [projects, setProjects] = useState<PageResponse<ProjectResponse> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await ProjectService.getAll();
            setProjects(data);
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
                const data = await ProjectService.getAll();
                if (isMounted) {
                    setProjects(data);
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
        projects,
        setProjects,
        isLoading,
        refetch,
    }
}