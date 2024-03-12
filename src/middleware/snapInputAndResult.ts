import { NextFunction, Request, Response } from "express";
import { db } from "repository/db";
import dayjs from "dayjs";

const snapInputAndResult = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const originalJson = res.json;

    // Override the json method to capture the output
    res.json = (data) => {
        db.snapshot
            .create({
                data: {
                    input: req.body,
                    output: data,
                },
            })
            .then((result) => {
                console.info(
                    `${dayjs().format("YYYY-MM-DDTHH:mm:ss")} Snap Data: ${
                        result.id
                    }`
                );
            });

        // Call the original json method
        return originalJson.call(res, data);
    };

    // Continue to the next middleware or route handler
    next();
};

export default snapInputAndResult;
