export type EducationStatus = "IN_PROGRESS" | "COMPLETED";

export type YearMonth = {
    year: number,
    month: number
}

export type EducationCreateResponse = {
    institution: string;
    description: string;
    location: string;
    degree: string;
    speciality: string;
    startDate: YearMonth;
    endDate: YearMonth;
    grade: number;
    status: EducationStatus;
    url: string;
}

export type EducationResponse = {
    id: string;
    institution: string;
    description?: string;
    location: string;
    degree: string;
    speciality: string;
    startDate: string;
    endDate?: string;
    grade?: number;
    status: EducationStatus;
    url?: string;
    orderIndex: number;
    createdAt: Date;
}