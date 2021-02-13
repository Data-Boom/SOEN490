import 'dotenv/config';

import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import mailgun from 'mailgun-js';

import { BadRequest, InternalServerError } from "@tsed/exceptions";

import { AuthenticationModel } from '../models/AuthenticationModel'
import { IFetchUserDetail, IForgotPasswordInformation, IResetPasswordInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IJwtParams } from '../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IUpdateUserDetail } from './../genericInterfaces/AuthenticationInterfaces';
import { IDimensionModel } from '../models/interfaces/IDimension';

/**
 * This class services authentication or User related requests and handles
 * interacts with the database for the Accounts table
 */
export class DimensionService {
  private requestResponse: IResponse = {} as any;

  constructor() {
  }

  /**
   * This method is responsible for handling the logic of registering a new user. Steps followed:
   * User input email is checked against the database for duplication, upon success, the user password is 
   * hashed and the user is registered.
   * @param SignUpInformation - User Sign in Information. ISignUp is an interface with all required params
   */
  async processAddDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {

    let name: string

    name = await DimensionModel.verifyIfNameExists(dimensionInfo.name);
    if (name) {
      throw new BadRequest("This dimension already exists! Please enter different values");
    }
    else {
      try {

        // await AuthenticationModel.insertSignUpInformation(dimensionInfo);
      }
      catch (error) {
        throw new InternalServerError("Internal Server Issue. Please try again later", error.message);
      }
    }
    this.requestResponse.message = "Success";
    this.requestResponse.statusCode = 200;
    return this.requestResponse
  }

  // async processAddDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {

  //   let email: boolean;

  //   // email = await AuthenticationModel.verifyIfEmailExists(dimensionInfo.email);
  //   if (email) {
  //     throw new BadRequest("Email already exists! Please enter a different email address");
  //   }
  //   else {
  //     try {

  //       // await AuthenticationModel.insertSignUpInformation(dimensionInfo);
  //     }
  //     catch (error) {
  //       throw new InternalServerError("Internal Server Issue. Please try again later", error.message);
  //     }
  //   }
  //   this.requestResponse.message = "Success";
  //   this.requestResponse.statusCode = 200;
  //   return this.requestResponse
  // }

  // async processAddDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {

  //   let email: boolean;

  //   // email = await AuthenticationModel.verifyIfEmailExists(dimensionInfo.email);
  //   if (email) {
  //     throw new BadRequest("Email already exists! Please enter a different email address");
  //   }
  //   else {
  //     try {

  //       // await AuthenticationModel.insertSignUpInformation(dimensionInfo);
  //     }
  //     catch (error) {
  //       throw new InternalServerError("Internal Server Issue. Please try again later", error.message);
  //     }
  //   }
  //   this.requestResponse.message = "Success";
  //   this.requestResponse.statusCode = 200;
  //   return this.requestResponse
  // }

  // async processAddDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {

  //   let email: boolean;

  //   // email = await AuthenticationModel.verifyIfEmailExists(dimensionInfo.email);
  //   if (email) {
  //     throw new BadRequest("Email already exists! Please enter a different email address");
  //   }
  //   else {
  //     try {

  //       // await AuthenticationModel.insertSignUpInformation(dimensionInfo);
  //     }
  //     catch (error) {
  //       throw new InternalServerError("Internal Server Issue. Please try again later", error.message);
  //     }
  //   }
  //   this.requestResponse.message = "Success";
  //   this.requestResponse.statusCode = 200;
  //   return this.requestResponse
  // }


}