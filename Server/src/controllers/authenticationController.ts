import * as Yup from 'yup';
import { IForgotPasswordInformation, ILoginInformation, IResetPasswordInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { NextFunction, Request, Response } from 'express';

import { AuthenticationService } from '../services/authenticationService';
import { BadRequest } from '@tsed/exceptions';
import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IUpdateUserDetail } from './../genericInterfaces/AuthenticationInterfaces';

/**
 * This controller is responsible for verifying the user request has correct parameters input.
 * After request is verified, the appropriate service can be called to fulfill user signup or login
 */
const schema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string()
    .required()
    .matches(new RegExp('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/'), "Password must contain in between 8 to 30 characters, one uppercase, one number and one special case character")
})

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

  async createLogoutRequest(request: Request, response: Response, next: NextFunction) {
    response.clearCookie('token', { path: '/' });
    response.end();
    return response;
  }

  async createForgotPasswordRequest(request: Request, response: Response, next: NextFunction): Promise<Response> {
    this.invalidResponse = this.validateForgotPasswordRequest(request);
    if (this.invalidResponse) {
      return response.status(400).json("Request is invalid, Email attribute is missing");
    }
    else {
      let requestParams: any = { ...request.body };
      let forgotPasswordInfo: IForgotPasswordInformation = requestParams;
      let res: any = await this.callServiceForForgotPassword(forgotPasswordInfo, response, next);
      return res;
    }
  }

  async resetPasswordWithResetTokenRequest(request: Request, response: Response, next: NextFunction): Promise<Response> {
    this.invalidResponse = this.validateResetPasswordRequest(request);
    if (this.invalidResponse) {
      return response.status(400).json("User was not found");
    }
    else {
      let requestParams: any = { ...request.body };
      let resetPasswordInfo: IResetPasswordInformation = requestParams;
      let res: any = await this.callServiceForResetPassword(resetPasswordInfo, response, next);
      return res;
    }
  }

  private validateResetPasswordRequest(request: Request): boolean {
    if (schema.isValidSync) {
      return !request.body.resetToken && (this.validateUpdatePasswordRequest(request));
    }
  }

  private validateUpdatePasswordRequest(request: Request): boolean {
    if (schema.isValidSync) {
      return !request.body.password && !request.body.passwordConfirmation && request.body.password === request.body.passwordConfirmation;
    }
  }

  private validateForgotPasswordRequest(request: Request): boolean {
    return !request.body.email;
  }

  private validateSignUpRequest(request: Request): boolean {
    if (request.body.email && request.body.password && request.body.firstName && request.body.lastName && request.body.organizationName) {
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
    if (request.body.hasOwnProperty('password') || request.body.hasOwnProperty('organizationName')) {
      return true;
    } else {
      return false;
    }
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

  private async callServiceForForgotPassword(forgotPasswordInfo: IForgotPasswordInformation, response: Response, next: NextFunction): Promise<Response> {
    this.authenticationService = new AuthenticationService();
    let serviceResponse: IResponse
    try {
      serviceResponse = await this.authenticationService.forgotPassword(forgotPasswordInfo);
      return response.status(serviceResponse.statusCode).json('Success');
    } catch (error) {
      console.log(error);
      return response.status(error.status).json(error.message);
    }
  }

  private async callServiceForResetPassword(resetPasswordInfo: IResetPasswordInformation, response: Response, next: NextFunction): Promise<Response> {
    this.authenticationService = new AuthenticationService();
    let serviceResponse: IResponse;
    try {
      serviceResponse = await this.authenticationService.updatePassword(resetPasswordInfo);
      return response.status(serviceResponse.statusCode).json('Success');
    } catch (error) {
      console.log(error);
      return response.status(error.status).json(error.message);
    }
  }

  private async callServiceForLogin(LoginInfo: ILoginInformation, response: Response, next: NextFunction): Promise<Response> {
    this.authenticationService = new AuthenticationService();
    let serviceResponse: IResponse
    try {

      serviceResponse = await this.authenticationService.checkLoginCredentials(LoginInfo);

      //todo put secure: true when we go https.
      response && response.cookie('token', serviceResponse.message, { httpOnly: true, sameSite: "lax" })

      return response.status(serviceResponse.statusCode).json('Success');
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