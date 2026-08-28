export type AboutParagraphCreateRequest = {
    content: string;
}

export type AboutParagraphUpdateRequest = {
    content: string;
}

export type AboutParagraphResponse = {
    id: string;
    content: string;
    orderIndex: number;
    createdAt: Date
}