import { IUserDetailUpdater } from './../genericInterfaces/AuthenticationInterfaces';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../services/authenticationService';

import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../genericInterfaces/AuthenticationInterfaces';

import { BadRequest, InternalServerError } from "@tsed/exceptions";

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
            let requestParams: any = { ...request.query };
            let loginInfo: ILoginInformation = requestParams;
            let res: any = await this.callServiceForLogin(loginInfo, response, next);
            return res;
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

    private validateUserDetailRequest(request: Request): boolean {
        if (request.query.hasOwnProperty('password')) {
            return true;
        } else
            return false;
    }

    async updateUserDetailRequest(request: Request, response: Response, next: NextFunction): Promise<Response> {

        this.invalidResponse = this.validateUserDetailRequest(request);
        if (!this.invalidResponse) {
            return response.status(400).json("Request is invalid. ")
        } else {
            let requestParams: any = { ...request.query };
            let updateUserDetail: IUserDetailUpdater = requestParams;
            //call validateUserDetails from service inside callServiceForUpdateUserDetails
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
    private async callServiceForUpdateUserDetails(updateUserDetail: IUserDetailUpdater, response: Response, next: NextFunction): Promise<Response> {
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
            response.setHeader('Set-Cookie', serviceResponse.message);
            return response.status(serviceResponse.statusCode).json(serviceResponse.message);
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
            let userEmail: any = request.query.email;
            this.authenticationService = new AuthenticationService();
            serviceResponse = await this.authenticationService.loadUserDetails(userEmail);
            return response.status(serviceResponse.statusCode).json(JSON.parse(serviceResponse.message));
        } catch (error) {
            return response.status(error.status).json(error.message);
        }
    }

}