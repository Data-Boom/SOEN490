import { Request, Response } from 'express';
import { AuthenticationService } from '../services/authenticationService';

import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ISignUpInformation } from '../genericInterfaces/SignUpInterface';
import { ILoginInformation } from '../genericInterfaces/LoginInterface';

export class AuthenticationController {
    private authenticationService: AuthenticationService;
    private invalidResponse: boolean;

    constructor() {
    }

    createSignUpRequest(request: Request, response: Response) {
        this.invalidResponse = this.validateSignUpRequest(request);
        if (this.invalidResponse) {
            response.status(400).json("Request is invalid. Missing attributes")
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
            if (!request.query.hasOwnProperty("isAdmin")) {
                signUpInfo.isAdmin = false;
            }
            else {
                signUpInfo.isAdmin = request.query.isAdmin as any;
            }

            this.callServiceForSignUp(signUpInfo, response);
        }
    }

    createLoginRequest(request: Request, response: Response) {
        this.invalidResponse = this.validateLoginRequest(request);
        if (this.invalidResponse) {
            response.status(400).json("Request is invalid. Email or Password is attributes missing")
        }
        else {
            let loginInfo: ILoginInformation;
            loginInfo = {} as any;
            loginInfo.email = request.query.email as string;
            loginInfo.password = request.query.password as string;

            this.callServiceForLogin(loginInfo, response);
        }
    }

    private validateSignUpRequest(request: Request): boolean {

        if (request.query.hasOwnProperty('email') && request.query.hasOwnProperty('password') && request.query.hasOwnProperty('firstName')
            && request.query.hasOwnProperty('lastName') && request.query.hasOwnProperty('organizationName')) {
            return false;
        }
        else {
            return true;
        }
    }

    private validateLoginRequest(request: Request): boolean {
        if (request.query.hasOwnProperty('email') || request.query.hasOwnProperty('password')) {
            return true
        }
        else {
            return false;
        }
    }

    private async callServiceForSignUp(signUpInfo: ISignUpInformation, response: Response) {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse = await this.authenticationService.processSignUp(signUpInfo);
        response.status(serviceResponse.statusCode).json(serviceResponse);
    }

    private async callServiceForLogin(LoginInfo: ILoginInformation, response: Response) {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse = await this.authenticationService.checkLoginCredentials(LoginInfo);
        response.status(serviceResponse.statusCode).json(serviceResponse);
    }
}