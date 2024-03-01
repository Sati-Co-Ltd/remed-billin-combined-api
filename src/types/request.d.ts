declare namespace Express {
    interface Request {
        user?: {
            id: string;
            role: { id: number; moduleAction: number[]; name: string };
        };
    }
}
