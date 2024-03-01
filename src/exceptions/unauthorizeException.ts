class UnauthorizeException extends Error {
    status: number;

    constructor(msg: string, status?: number) {
        super(msg);
        this.status = status ?? 401;
    }
}

export default UnauthorizeException;
