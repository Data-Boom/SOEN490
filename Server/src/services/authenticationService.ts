import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import 'dotenv/config';

import { AuthenticationModel } from '../models/AuthenticationModel'

import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IJwtParams } from '../genericInterfaces/AuthenticationInterfaces';

import { IResponse } from '../genericInterfaces/ResponsesInterface'

export class AuthenticationService {
    private requestResponse: IResponse = {} as any;

    constructor() {
    }

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

    async checkLoginCredentials(userInformation: ILoginInformation): Promise<IResponse> {

        let verifiedEmail: string;
        let savedPasswordHash: string;
        let accessToken: string;
        let refreshToken: string;
        let tokenExpiry: string;

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
                tokenExpiry = '1m';
                accessToken = await this.generateJwtToken(jwtParams, tokenExpiry);
                refreshToken = await this.generateJwtToken(jwtParams)
            } catch (error) {
                this.requestResponse.status = "Failure";
                this.requestResponse.statusCode = 500;
                this.requestResponse.response = "Internal Server Issue. Please try again later";
                return this.requestResponse
            }

            this.requestResponse.status = "Success";
            this.requestResponse.statusCode = 200;
            this.requestResponse.response = {
                "AccessToken": accessToken,
                "RefreshToken": refreshToken
            };
        }

        return this.requestResponse;
    }

    private async hashPassword(password: string): Promise<string> {

        let hashedPassword: string;
        hashedPassword = await argon2.hash(password);
        return hashedPassword;
    }

    private async generateJwtToken(jwtParams: IJwtParams, jwtExpiry?: string): Promise<string> {

        let token: string;
        const jwtAccessKey = process.env.ACCESS_SECRET_KEY;
        const jwtRefreshKey = process.env.REFRESH_SECRET_KEY;

        if (jwtExpiry !== undefined) {
            token = await jwt.sign({ accountId: jwtParams.account_id, firstName: jwtParams.firstName }, process.env.ACCESS_SECRET_KEY, {
                expiresIn: jwtExpiry
            })
        }
        else {
            token = await jwt.sign({ accountId: jwtParams.account_id, firstName: jwtParams.firstName }, process.env.REFRESH_SECRET_KEY)
        }
        return token;
    }

    async refreshToken(refreshToken: string): Promise<IResponse> {

        let newToken: string;
        let tokenExpiry: string;

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err: Error) => {
            if (err) {
                this.requestResponse.status = "Failure";
                this.requestResponse.statusCode = 403;
                this.requestResponse.response = "Failed to verify Refresh Token";
                return this.requestResponse;
            }
        });
        this.requestResponse.status = "Success";
        this.requestResponse.statusCode = 200;
        this.requestResponse.response = {
            "AccessToken": newToken,
            "RefreshToken": refreshToken
        };
        return this.requestResponse;
    }
}

