import {useCallback, useEffect, useState} from "react";
import type {SkillByCategory} from "../type/portfolio/skill.ts";
import {SkillService} from "../services/portfolio/skill.service.ts";
import {handleError} from "../utils/error.handler.ts";

const DEFAULT_FETCH_ERROR_MESSAGE = "Failed to fetch skills.";

export const useSkills = () => {
    const [skills, setSkills] = useState<SkillByCategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await SkillService.getAll();
            setSkills(data);
        } catch (err) {
            handleError(err as Error, DEFAULT_FETCH_ERROR_MESSAGE);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await SkillService.getAll();
                if (isMounted) {
                    setSkills(data);
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
        skills,
        setSkills,
        isLoading,
        refetch,
    }
}