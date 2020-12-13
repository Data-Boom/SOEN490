import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import 'dotenv/config';

import { AuthenticationModel } from '../models/AuthenticationModel'

import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IJwtParams } from '../genericInterfaces/AuthenticationInterfaces';

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
    async processSignUp(SignUpInformation: ISignUpInformation): Promise<IResponse> {

        let email: boolean;
        try {
            email = await AuthenticationModel.verifyIfEmailExists(SignUpInformation.email);
            if (!email) {
                SignUpInformation.password = await this.hashPassword(SignUpInformation.password)
                await AuthenticationModel.insertSignUpInformation(SignUpInformation);
            }
            else throw new Error();

        } catch (error) {
            this.requestResponse.status = "Failure";
            this.requestResponse.statusCode = 400;
            this.requestResponse.response = "Email is already in the System. Please check again";

            return this.requestResponse
        }
        this.requestResponse.status = "Success";
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

        try {
            verifiedEmail = await AuthenticationModel.verifyIfEmailExists(userInformation.email);
            if (!verifiedEmail)
                throw new Error();
        }
        catch (error) {
            this.requestResponse.status = "Failure";
            this.requestResponse.statusCode = 400;
            this.requestResponse.response = "Email is not in the System or its mispelled. Check Again";

            return this.requestResponse
        }

        savedPasswordHash = await AuthenticationModel.verifyPassword(userInformation.email);

        if (!(await argon2.verify(savedPasswordHash, userInformation.password))) {
            this.requestResponse.status = "Failure";
            this.requestResponse.statusCode = 400;
            this.requestResponse.response = "Password does not match";

            return this.requestResponse
        }
        else {
            let jwtParams: IJwtParams;
            try {
                jwtParams = await AuthenticationModel.obtainJWTParams(userInformation.email);
                accessToken = await this.generateJwtToken(jwtParams);
            } catch (error) {
                this.requestResponse.status = "Failure";
                this.requestResponse.statusCode = 500;
                this.requestResponse.response = "Internal Server Issue. Please try again later";
                return this.requestResponse
            }

            this.requestResponse.status = "Success";
            this.requestResponse.statusCode = 200;
            this.requestResponse.response = accessToken;
        }

        return this.requestResponse;
    }
    /**
     * Resposible for hashing the user input password
     * @param password - user password
     */
    private async hashPassword(userPassword: string): Promise<string> {

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
        let jwtExpiry: number = 300;
        const jwtAccessKey = process.env.ACCESS_SECRET_KEY;

        token = await jwt.sign({ accountId: jwtParams.account_id, firstName: jwtParams.firstName }, jwtAccessKey, {
            expiresIn: jwtExpiry
        })
        return token;
    }

    private async createCookie(token: string) {

    }
}

