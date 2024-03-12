import { NextFunction, Response, Request } from "express";
import { db } from "repository/db";
const incrementUsage = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = (req.headers["api-key"] || req.query["api-key"]) as string;

    db.app
        .update({
            where: {
                apiKey,
            },
            data: {
                currentUsage: {
                    increment: 1,
                },
            },
        })
        .then((data) => {
            console.info(`increment usage for ${data.id}`);
        });
    next()
};

export default incrementUsage;
