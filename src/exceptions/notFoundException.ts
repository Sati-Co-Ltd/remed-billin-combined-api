class NotFoundException extends Error {
    status: number;
    constructor(msg: string) {
        super(msg);
        this.status = 404;
    }
}

export default NotFoundException;
