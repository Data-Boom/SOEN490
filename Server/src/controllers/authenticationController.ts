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

    async createSignUpRequest(request: Request, response: Response, next: NextFunction): Promise<Response> {
        this.invalidResponse = this.validateSignUpRequest(request);
        if (this.invalidResponse) {
            return response.status(400).json("Request is invalid. Missing attributes")
        }
        else {
            let requestParams: any = { ...request.query };
            let signUpInfo: ISignUpInformation = requestParams;

            if (!request.query.hasOwnProperty("isAdmin")) {
                signUpInfo.isAdmin = false;
            }
            else {
                signUpInfo.isAdmin = request.query.isAdmin as any;
            }
            let res: IResponse = await this.callServiceForSignUp(signUpInfo, response, next);
            return response.status(res.statusCode).json(res.response);
        }
    }

    async createLoginRequest(request: Request, response: Response, next: NextFunction): Promise<Response> {
        this.invalidResponse = this.validateLoginRequest(request);
        if (this.invalidResponse) {
            return response.status(400).json("Request is invalid. Email or Password attribute missing")
        }
        else {
            let requestParams: any = { ...request.query };
            let loginInfo: ILoginInformation = requestParams;

            let res: IResponse = await this.callServiceForLogin(loginInfo, response, next);
            //response.setHeader('Set-Cookie', res.response);
            return response.status(res.statusCode).json(res.response);
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

    private async callServiceForSignUp(signUpInfo: ISignUpInformation, response: Response, next: NextFunction): Promise<IResponse> {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse = await this.authenticationService.processSignUp(signUpInfo);
        return serviceResponse;
    }

    private async callServiceForLogin(LoginInfo: ILoginInformation, response: Response, next: NextFunction): Promise<IResponse> {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse
        try {
            serviceResponse = await this.authenticationService.checkLoginCredentials(LoginInfo);
            return serviceResponse;
        } catch (error) {
            next(error);
        }
    }
}