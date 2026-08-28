export type ProjectStatus = "IN_PROGRESS" | "COMPLETED" | "PAUSED" | "ARCHIVED";

export type ProjectCreateRequest = {
    title: string;
    description: string;
    imageUrl?: string;
    url: string;
    status: ProjectStatus;
}

export type ProjectUpdateRequest = {
    title?: string;
    description?: string;
    imageUrl?: string;
    url?: string;
    status?: ProjectStatus;
}

export type ProjectResponse = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    url?: string;
    status: ProjectStatus;
    orderIndex: number;
    createdAt: Date;
}