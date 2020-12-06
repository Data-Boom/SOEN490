export interface IResponse {
    status: string
    statusCode: number
    response?: string
}

export interface SuccessIResponse extends IResponse {
    status: "Success",
    statusCode: 200,
    adminRights: string;
}

export interface FailureIResponse extends IResponse {
    status: "Failure"
    statusCode: 400;
}