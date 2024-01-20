interface IApiRespone {
    status_code: number;
    success: boolean;
    message: string;
    meta?: {
        total: number;
        page_size: number;
        page_number: number;
        totalPages: number;
    };
    data?: unknown;
    timestamp: string;
}

export default IApiRespone;