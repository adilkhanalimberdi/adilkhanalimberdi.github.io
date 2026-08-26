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

export function parseYearMonthString(data: string): string {
    const [year, month] = data.split('-');

    return `${year}-${month.padStart(2, '0')}`;
}