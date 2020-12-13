import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../services/authenticationService';

import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../genericInterfaces/AuthenticationInterfaces';

/**
 * This controller is responsible for verifying the user request has correct parameters input.
 * After request is verified, the appropriate service can be called to fulfill user signup or login
 */
export class AuthenticationController {
    private authenticationService: AuthenticationService;
    private invalidResponse: boolean;

    constructor() {
    }

    createSignUpRequest(request: Request, response: Response, next: NextFunction): Response {
        this.invalidResponse = this.validateSignUpRequest(request);
        if (this.invalidResponse) {
            return response.status(400).json("Request is invalid. Missing attributes")
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
            this.callServiceForSignUp(signUpInfo, response, next);
        }
    }

    createLoginRequest(request: Request, response: Response, next: NextFunction): Response {
        this.invalidResponse = this.validateLoginRequest(request);
        if (this.invalidResponse) {
            return response.status(400).json("Request is invalid. Email or Password is attributes missing")
        }
        else {
            let loginInfo: ILoginInformation;
            loginInfo = {} as any;
            loginInfo.email = request.query.email as string;
            loginInfo.password = request.query.password as string;

            this.callServiceForLogin(loginInfo, response, next);
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
        if (request.query.hasOwnProperty('email') && request.query.hasOwnProperty('password')) {
            return false;
        }
        else {
            return true;
        }
    }

    private async callServiceForSignUp(signUpInfo: ISignUpInformation, response: Response, next: NextFunction): Promise<Response> {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse = await this.authenticationService.processSignUp(signUpInfo);
        return response.status(serviceResponse.statusCode).json(serviceResponse);
    }

    private async callServiceForLogin(LoginInfo: ILoginInformation, response: Response, next: NextFunction): Promise<Response> {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse
        try {
            serviceResponse = await this.authenticationService.checkLoginCredentials(LoginInfo);
            response.setHeader('Set-Cookie', serviceResponse.response);
            return response.status(serviceResponse.statusCode).json(serviceResponse);
        } catch (error) {
            next(error);
        }
    }
}