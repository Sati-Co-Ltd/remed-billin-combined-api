class HandleException extends Error {
    status: number;

    constructor(msg: string, status?: number) {
        super(msg);
        this.status = status || 400;
    }
}

export default HandleException;
