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

/**
 * This class services authentication or User related requests and handles
 * interacts with the database for the Accounts table
 */
export class AuthenticationService {
  private requestResponse: IResponse = {} as any;

  constructor() {
  }

  /**
   * This method is responsible for handling the logic of registering a new user. Steps followed:
   * User input email is checked against the database for duplication, upon success, the user password is 
   * hashed and the user is registered.
   * @param SignUpInformation - User Sign in Information. ISignUp is an interface with all required params
   */
  async processSignUp(signUpInformation: ISignUpInformation): Promise<IResponse> {

    let email: boolean;

    email = await AuthenticationModel.verifyIfEmailExists(signUpInformation.email);
    if (email) {
      throw new BadRequest("Email already exists! Please enter a different email address");
    }
    else {
      try {
        signUpInformation.password = await this.hashPassword(signUpInformation.password)
        await AuthenticationModel.insertSignUpInformation(signUpInformation);
      }
      catch (error) {
        throw new InternalServerError("Internal Server Issue. Please try again later", error.message);
      }
    }
    this.requestResponse.message = "Success";
    this.requestResponse.statusCode = 200;
    return this.requestResponse
  }

  /**
   * Resposible for authenticating user request for system access. Email is 
   * first verified for existence, then the associated user password hash is 
   * verified against the existence password hash in the database. Once a match 
   * is established, the service will request the parameters required to build the
   * JWT access token. After retrieval, a JWT token is built and sent back to the user
   * @param userInformation - This params contains only UserName & PassWord
   */
  async checkLoginCredentials(userInformation: ILoginInformation): Promise<IResponse> {

    let verifiedEmail: boolean;
    let savedPasswordHash: string;
    let accessToken: string;

    verifiedEmail = await AuthenticationModel.verifyIfEmailExists(userInformation.email);
    if (!verifiedEmail) {
      throw new BadRequest("Email is not in the System or its mispelled. Check Again");
    }

    savedPasswordHash = await AuthenticationModel.getPasswordHash(userInformation.email);

    if (!(await argon2.verify(savedPasswordHash, userInformation.password))) {
      throw new BadRequest("Password does not match");
    }
    else {
      let jwtParams: IJwtParams;
      try {
        jwtParams = await AuthenticationModel.obtainJWTParams(userInformation.email);
        accessToken = this.generateJwtToken(jwtParams);
        await AuthenticationModel.isAdminStatus(userInformation.email);
      } catch (error) {
        throw new InternalServerError("Internal Server Issue. Please try again later", error.message)
      }
      this.requestResponse.statusCode = 200;
      this.requestResponse.message = accessToken;
    }
    return this.requestResponse;
  }

  async updatePassword(resetPasswordInformation: IResetPasswordInformation): Promise<IResponse> {
    let resetToken = resetPasswordInformation.resetToken;

    if (resetPasswordInformation.password === undefined) {
      throw new BadRequest("The token has expired");
    }
    else {
      try {
        let passwordHash = await this.hashPassword(resetPasswordInformation.password);
        await AuthenticationModel.resetPasswordByToken(resetToken, passwordHash);
        this.requestResponse.message = "Password reset successfully"
        this.requestResponse.statusCode = 200
      } catch (error) {
        throw new InternalServerError(error.message);
      }
    }
    return this.requestResponse;
  }

  async forgotPassword(forgotPasswordInfo: IForgotPasswordInformation): Promise<IResponse> {
    let verifiedEmail: boolean;
    let accessToken: string;
    let resetTokenChanged: boolean;

    verifiedEmail = await AuthenticationModel.verifyIfEmailExists(forgotPasswordInfo.email);
    if (!verifiedEmail) {
      throw new BadRequest("If a user with such email address exists, you would receive an email");
    }
    else {
      let jwtParams: IJwtParams;
      try {
        jwtParams = await AuthenticationModel.obtainJWTParams(forgotPasswordInfo.email);
        accessToken = this.generateJwtToken(jwtParams);
        resetTokenChanged = await AuthenticationModel.resetPassword(forgotPasswordInfo.email, accessToken);
      } catch (error) {
        throw new InternalServerError("Internal server error", error.message);
      }

      if (!resetTokenChanged) {
        throw new InternalServerError("Internal server error when executing set resetToken on user");
      }

      let data = {
        from: "noreply@databoom.com",
        to: forgotPasswordInfo.email,
        subject: 'Reset your password',
        html: `<h2>To reset your password, please click on this link</h2><p><a>${process.env.CLIENT_URL}/api/v1/resetpassword/${accessToken}</a></p>
                `
      };

      let mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN_NAME });

      await mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
          throw new InternalServerError(error.message);
        }
      });

      this.requestResponse.statusCode = 200;
      this.requestResponse.message = "Email has been sent";
    }

    return this.requestResponse;
  }

  /**
   * Resposible for hashing the user input password
   * @param password - user password
   */
  async hashPassword(userPassword: string): Promise<string> {

    let hashedPassword: string;
    hashedPassword = await argon2.hash(userPassword);
    return hashedPassword;
  }

  /**
   * Resposible for building JWT token. This token contains a unique signature
   * that is only known the backend server. When requests come into the application
   * each request will contain an access token and its signature will be verified
   * @param jwtParams Parameters used to build JWT Token
   */
  private generateJwtToken(jwtPayload: IJwtParams): string {

    let token: string;
    let tokenInformation;
    let jwtExpiry: number = 3000;
    const jwtAccessKey = process.env.ACCESS_SECRET_KEY;

    token = jwt.sign({ jwtPayload }, jwtAccessKey, {
      expiresIn: jwtExpiry
    })
    tokenInformation = [token, jwtExpiry]
    return tokenInformation;
  }

  async validateUserDetails(userDetailUpdater: IUpdateUserDetail): Promise<IResponse> {
    let email = userDetailUpdater.email
    let password = userDetailUpdater.password
    let organizationName = userDetailUpdater.organizationName

    if (await AuthenticationModel.verifyIfEmailExists(email)) {
      try {
        if (password != undefined) {
          password = await this.hashPassword(password)
          await AuthenticationModel.updateUserPasswordDetail(email, password);
        }
        if (organizationName != undefined) {
          await AuthenticationModel.updateUserOrganizationDetail(email, organizationName);
        }
      } catch (error) {
        throw new InternalServerError("Internal server problem...try again!");
      }
    }
    else {
      throw new BadRequest("Email cannot be found. Request declined");
    }
    this.requestResponse.message = "Success";
    this.requestResponse.statusCode = 200;
    return this.requestResponse
  }
  /**
   * This method is used to loadUserDetails upon logging on user page. This will 
   * call userModel to fetch all required data 
   * @param userEmail User Email
   */
  async loadUserDetails(userEmail: string): Promise<IResponse> {

    let userDetails: IFetchUserDetail
    let verifiedEmail: boolean;
    verifiedEmail = await AuthenticationModel.verifyIfEmailExists(userEmail);
    if (!verifiedEmail) {
      throw new BadRequest("Cannot fetch details for this email");
    }
    try {
      userDetails = await AuthenticationModel.fetchUserDetails(userEmail);
    }
    catch (error) {
      throw new InternalServerError("Internal Server Error fetching Details. Try again later")
    }
    this.requestResponse.message = JSON.stringify(userDetails);
    this.requestResponse.statusCode = 200;
    return this.requestResponse
  }
}

