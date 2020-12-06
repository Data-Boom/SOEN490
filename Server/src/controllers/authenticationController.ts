import { Request, Response } from 'express';
import { AuthenticationService } from '../services/authenticationService';

interface ISignUpInformation {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    organizationName: string,
    isAdmin: string
}


export class AuthenticationController {
    private authenticationService: AuthenticationService;
    private invalidResponse: any;

    constructor() {
    }

    createSignUpRequest(request: Request, response: Response) {
        console.log(request.query)
        this.invalidResponse = this.validateSignInRequest(request);
        if (this.invalidResponse) {
            response.status(400).send("Request is invalid.")
        }
        else {
            let signUpInfo: ISignUpInformation;
            signUpInfo = {} as any;
            signUpInfo.email = request.query.email as string;
            signUpInfo.password = request.query.password as string;
            signUpInfo.firstName = request.query.firstName as string;
            signUpInfo.lastName = request.query.lastName as string;
            signUpInfo.dateOfBirth = request.query.dateOfBirth as any;
            signUpInfo.organizationName = request.query.organizationName as string;
            signUpInfo.isAdmin = request.query.isAdmin as string;

            this.callServiceForSignUp(signUpInfo, response);
        }
    }

    createLoginRequest(request: Request, response: Response) {
        this.invalidResponse = this.validateLoginRequest(request);
    }

    private validateSignInRequest(request: Request) {
        let invalidAttributes: JSON;
        if (!request.params || request.params.hasOwnProperty('email')) {

        }
    }

    private validateLoginRequest(request: Request) {
    }

    private async callServiceForSignUp(signUpObject: ISignUpInformation, response: Response) {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: any = await this.authenticationService.processSignUp(signUpObject);
        response.status(serviceResponse.statusCode).json(serviceResponse);
    }
}