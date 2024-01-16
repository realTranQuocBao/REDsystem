import IApiRespone from "../interfaces/IApiRespone.interface";

const success = (
    data: object | object[] | null,
    statusCode: number = 200,
    message: string = "Get data success!",
    meta: { total: number, page_size: number, page_number: number, totalPages: number } | undefined = undefined,
): IApiRespone => {

    let newData;

    if (data === null) {
        newData = undefined;
    }
    else if (Array.isArray(data)) {
        newData = {
            items: data,
            totalRecord: data.length
        }
    }
    else {
        newData = {
            items: data,
            totalRecord: 1
        }
    }

    return {
        success: true,
        status_code: statusCode,
        message: message,
        meta: meta,
        data: newData,
        timestamp: new Date().toISOString(),
    };
}

const apiResponseService = {
    success
}

export default apiResponseService;