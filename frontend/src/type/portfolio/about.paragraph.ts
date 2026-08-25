export type AboutParagraphCreateRequest = {
    content: string;
}

export type AboutParagraphResponse = {
    id: string;
    content: string;
    orderIndex: number;
    createdAt: Date
}