// https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;