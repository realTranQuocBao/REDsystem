import { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, `Endpoint not found - ${req.originalUrl}`));
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    console.error(`REDsystem Error: ${error}`);
    let errorMessage: string = "An unknow error occurred";
    let statusCode: number = 500;
    let isSuccess: boolean = false;

    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }

    //if err is `jwt expired`
    if (error.message == "jwt expired" || error.message == "invalid signature") {
        statusCode = 403;
        errorMessage = "Not authorized, token failed";
    }

    if (Math.floor(statusCode / 100) === 2) {
        isSuccess = true;
    }

    res.status(statusCode).json({
        status_code: statusCode,
        success: isSuccess,
        message: `[REDsystem Error]: ${errorMessage}`,
        stack: (process.env.NODE_ENV === "development") ? error.stack : undefined,
        timestamp: new Date().toISOString(),
    });
}

const errorMiddleware = {
    notFound,
    errorHandler
};

export default errorMiddleware;