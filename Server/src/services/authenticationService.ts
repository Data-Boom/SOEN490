import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import 'dotenv/config';

import { AuthenticationModel } from '../models/AuthenticationModel'

import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IJwtParams } from '../genericInterfaces/AuthenticationInterfaces';
import { IUserDetailUpdater } from './../genericInterfaces/AuthenticationInterfaces';
import { IUserDetails } from '../genericInterfaces/AuthenticationInterfaces';

import { BadRequest, InternalServerError } from "@tsed/exceptions";

import { IResponse } from '../genericInterfaces/ResponsesInterface'


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
                new InternalServerError("Internal Server Issue. Please try again later", error.message);
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
                accessToken = await this.generateJwtToken(jwtParams);
                await AuthenticationModel.isAdminStatus(userInformation.email);
            } catch (error) {
                throw new InternalServerError("Internal Server Issue. Please try again later", error.message)
            }
            this.requestResponse.statusCode = 200;
            this.requestResponse.message = accessToken;
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
    private async generateJwtToken(jwtParams: IJwtParams): Promise<string> {

        let token: string;
        let jwtExpiry: number = 3000;
        const jwtAccessKey = process.env.ACCESS_SECRET_KEY;

        token = await jwt.sign({ accountId: jwtParams.account_id, firstName: jwtParams.firstName }, jwtAccessKey, {
            expiresIn: jwtExpiry
        })
        return token;
    }

    async validateUserDetails(userDetailUpdater: IUserDetailUpdater): Promise<IResponse> {
        let email = userDetailUpdater.email
        let password = userDetailUpdater.password
        let organization = userDetailUpdater.organization

        // email = await AuthenticationModel.verifyIfEmailExists(userDetailUpdater.email);
        if (await AuthenticationModel.verifyIfEmailExists(email)) {
            try {
                if (password != undefined) {
                    password = await this.hashPassword(password)
                    await AuthenticationModel.updateUserPasswordDetail(email, password);
                }
                if (organization != undefined) {
                    await AuthenticationModel.updateUserOrganizationDetail(email, organization);
                }
            } catch (error) {
                throw new InternalServerError("Internal server problem...try again!");
            }
        }
        else {
            throw new BadRequest("Email is not valid. Please enter the correct email!");
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
    async loadUserDetails(userEmail: string): Promise<IResponse> {//need test

        let userDetails: IUserDetails
        let verifiedEmail: boolean;
        verifiedEmail = await AuthenticationModel.verifyIfEmailExists(userEmail);
        if (!verifiedEmail) {
            throw new BadRequest("Cannot fetch details for this email");
        }
        try {
            userDetails = await AuthenticationModel.getUserDetails(userEmail);
        }
        catch (error) {
            throw new InternalServerError("Internal Server Error fetching Details. Try again later")
        }
        this.requestResponse.message = JSON.stringify(userDetails);
        this.requestResponse.statusCode = 200;
        return this.requestResponse
    }
}

