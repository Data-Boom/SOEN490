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
            let requestParams: any = { ...request.query };
            let signUpInfo: ISignUpInformation = requestParams;
            this.callServiceForSignUp(signUpInfo, response, next);
        }
    }

    createLoginRequest(request: Request, response: Response, next: NextFunction): Response {
        this.invalidResponse = this.validateLoginRequest(request);
        if (this.invalidResponse) {
            return response.status(400).json("Request is invalid. Email or Password attribute missing")
        }
        else {
            let requestParams: any = { ...request.query };
            let loginInfo: ILoginInformation = requestParams;
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
        let serviceResponse: IResponse;
        try {
            serviceResponse = await this.authenticationService.processSignUp(signUpInfo);
            return response.status(200).json('Success');
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }

    private async callServiceForLogin(LoginInfo: ILoginInformation, response: Response, next: NextFunction): Promise<Response> {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse
        try {
            serviceResponse = await this.authenticationService.checkLoginCredentials(LoginInfo);
            response.setHeader('Set-Cookie', serviceResponse.message);
            return response.status(serviceResponse.statusCode).json(serviceResponse.message);
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }
}