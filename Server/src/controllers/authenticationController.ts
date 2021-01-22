import { BadRequest, InternalServerError } from "@tsed/exceptions";
import { NextFunction, Request, Response } from 'express';

import { AuthenticationModel } from '../models/AuthenticationModel'
import { AuthenticationService } from '../services/authenticationService';
import { ILoginInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IUpdateUserDetail } from './../genericInterfaces/AuthenticationInterfaces';

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
            let requestParams: any = { ...request.body };
            let signUpInfo: ISignUpInformation = requestParams;
            let res: any = await this.callServiceForSignUp(signUpInfo, response, next);
            return res;
        }
    }

    async createLoginRequest(request: Request, response: Response, next: NextFunction): Promise<Response> {
        this.invalidResponse = this.validateLoginRequest(request);
        if (this.invalidResponse) {
            return response.status(400).json("Request is invalid. Email or Password attribute missing")
        }
        else {
            let requestParams: any = { ...request.body };
            let loginInfo: ILoginInformation = requestParams;
            try {
                let res: any = await this.callServiceForLogin(loginInfo, response, next);
                return res;
            }
            catch (error) {
            }

        }
    }

    private validateSignUpRequest(request: Request): boolean {
        if (request.body.email && request.body.password && request.body.firstName
            && request.body.lastName && request.body.organizationName) {
            return false;
        }
        else {
            return true;
        }
    }

    private validateLoginRequest(request: Request): boolean {
        if (request.body.email && request.body.password) {
            return false;
        }
        else {
            return true;
        }
    }

    private validateUserDetailRequest(request: Request): boolean {
        if (request.body.hasOwnProperty('password') || request.body.hasOwnProperty('organization')) {
            return true;
        } else
            return false;
    }

    async updateUserDetailRequest(request: Request, response: Response, next: NextFunction): Promise<Response> {

        this.invalidResponse = this.validateUserDetailRequest(request);
        if (!this.invalidResponse) {
            return response.status(400).json("Request is invalid")
        } else {
            let requestParams: any = { ...request.body };
            let updateUserDetail: IUpdateUserDetail = requestParams;
            try {
                let res: any = await this.callServiceForUpdateUserDetails(updateUserDetail, response, next);
                return response.status(res.statusCode).json(res.message);
            }
            catch (error) {
                return response.status(error.status).json(error.message);
            }

        }
    }
    //to get info passed from update user details method from service layer
    private async callServiceForUpdateUserDetails(updateUserDetail: IUpdateUserDetail, response: Response, next: NextFunction): Promise<Response> {
        this.authenticationService = new AuthenticationService();
        try {
            let serviceResponse: IResponse = await this.authenticationService.validateUserDetails(updateUserDetail);
            return response.status(serviceResponse.statusCode).json(serviceResponse.message);
        }
        catch (error) {
            return response.status(error.status).json(error.message);
        }
    }

    private async callServiceForSignUp(signUpInfo: ISignUpInformation, response: Response, next: NextFunction): Promise<Response> {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse;
        console.log(serviceResponse);
        try {
            serviceResponse = await this.authenticationService.processSignUp(signUpInfo);
            return response.status(serviceResponse.statusCode).json(serviceResponse.message);
        } catch (error) {
            if (error instanceof BadRequest)
                return response.status(error.status).json(error.message);
            else {
                return response.status(error.status).json("Something went Wrong");
            }
        }
    }

    private async callServiceForLogin(LoginInfo: ILoginInformation, response: Response, next: NextFunction): Promise<Response> {
        this.authenticationService = new AuthenticationService();
        let serviceResponse: IResponse
        try {

            serviceResponse = await this.authenticationService.checkLoginCredentials(LoginInfo);

            //todo put secure: true when we go https.
            response && response.cookie('token', serviceResponse.message, { httpOnly: true, sameSite: "lax" })

            const user = await AuthenticationModel.fetchUserDetails(LoginInfo.email);

            return response.status(serviceResponse.statusCode).json(user);
        } catch (error) {
            if (error instanceof BadRequest)
                return response.status(error.status).json(error.message);
            else {
                return response.status(error.status).json(error.message);
            }
        }
    }

    async createFetchUserDetailsRequest(request, response): Promise<Response> {
        let serviceResponse: IResponse;
        try {
            let userEmail: any = request.body.email;
            this.authenticationService = new AuthenticationService();
            serviceResponse = await this.authenticationService.loadUserDetails(userEmail);
            return response.status(serviceResponse.statusCode).json(JSON.parse(serviceResponse.message));
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }

}