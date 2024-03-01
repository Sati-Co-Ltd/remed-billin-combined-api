import { NextFunction, Request, Response } from "express";
import HandleException from "exceptions/handleException";
import NotFoundException from "exceptions/notFoundException";
import UnauthorizeException from "exceptions/unauthorizeException";

const globalErrorHandler = async (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof HandleException) {
        return res.status(err.status).json({
            message: err.message,
            status: err.status,
        });
    }
    if (err instanceof UnauthorizeException) {
        return res.status(err.status).json({
            message: err.message,
            status: err.status,
        });
    } else if (err instanceof NotFoundException) {
        return res.status(err.status).json({
            message: err.message,
            status: err.status,
        });
    } else if (err instanceof Error) {
        return res.status(500).json({
            status: 500,
            name: err.name,
            message: err.message,
            additionValue: err,
        });
    } else {
        return res.status(500).json({
            status: 500,
            additionValue: err,
        });
    }
};

export default globalErrorHandler;
