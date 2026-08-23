export type ContactMessageCreateRequest = {
    fullName: string,
    email: string,
    message: string
}

export type ContactMessageResponse = {
    id: string;
    fullName: string;
    email: string;
    message: string;
    isViewed: boolean;
    createdAt: Date;
}