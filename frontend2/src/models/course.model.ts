export interface ICourse {
    _id?: string;
    name?: string;
    category?: string;
    price?: number;
    level?: string;
    duration?: number;
    language?: string;
    instructor?: string;
    createdBy?: {
        _id: string;
        name: string;
        email: string;
    } | string;
    updatedBy?: {
        _id: string;
        name: string;
        email: string;
    } | string;
    createdAt?: Date;
    updatedAt?: Date;
}