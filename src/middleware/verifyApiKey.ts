import { NextFunction, Request, Response } from "express";
import { db } from "repository/db";
export const verifyApiKey = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const apiKey = (req.headers["api-key"] || req.query["api-key"]) as string;
    const match = await db.app.findFirst({
        where: {
            apiKey,
        },
    });

    if (match) {
        if (match.currentUsage >= match.limitation) {
            res.status(401).json({ message: "Usages Exceeds" });
        } else {
            next();
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
