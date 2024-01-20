export interface IApiResponse {
    success?: boolean;
    status_code?: number,
    message?: string,
    meta?: {
        total?: number;
        page_size?: number;
        page_number?: number;
        totalPages?: number;
    };
    data?: {
        items?: object | object[];
        totalRecord?: number;
    };
    timestamp?: Date;
}