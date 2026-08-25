import type {YearMonth} from "../type/portfolio/education.ts";

export function parseYearMonth(data: string): YearMonth {
    const parts = data.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]);

    return {
        year: year,
        month: month,
    };
}