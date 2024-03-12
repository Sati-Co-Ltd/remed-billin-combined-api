import { Request, Response, NextFunction } from "express";
import UnauthorizeException from "exceptions/unauthorizeException";
import { db } from "repository/db";
import { randomUUID } from "crypto";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as { name: string; secret: string };

        if (payload.secret === "satidev") {
            const result = await db.app.create({
                data: {
                    name: payload.name,
                    apiKey: randomUUID().replace(/-/g, ""),
                },
            });

            res.status(200).json(result);
        } else {
            throw new UnauthorizeException("Unauthorized");
        }
    } catch (error) {
        next(error);
    }
};

const getUsage = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = (req.headers["api-key"] || req.query["api-key"]) as string;
    const app = await db.app.findUnique({
        where: {
            apiKey,
        },
    });
    res.json(app);
};

const appController = {
    create,
    getUsage,
};

export default appController;
