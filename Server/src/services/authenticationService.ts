import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';

import { AuthenticationModel } from '../models/AuthenticationModel'

export class authenticationService {

    constructor() {
    }

    async hashPassword(password: string): Promise<string> {

        let hashedPassword: string;
        hashedPassword = await argon2.hash(password);
        return hashedPassword;
    }

    async generateJwtToken(jwtParams: JSON): Promise<JSON> {

        let accessToken: JSON;

        return accessToken;
    }

    async processSignUp(SignUpInformation: any) {

        await console.log(SignUpInformation);
        let password = await this.hashPassword(SignUpInformation.password)
        await AuthenticationModel.insertSignUpInformation(SignUpInformation.email, password, SignUpInformation.firstName, SignUpInformation.lastName, SignUpInformation.dateOfBirth, SignUpInformation.organizationName, SignUpInformation.isAdmin);
        return "is gucci";
    }

    async refreshToken(): Promise<string> {

        let newToken: string;

        return newToken;
    }

    async checkLoginCredentials(userInformation: any): Promise<JSON> {

        let verifiedEmail: string;
        let savedPasswordHash: string;
        let accessToken: JSON;

        verifiedEmail = await AuthenticationModel.verifyEmail(userInformation.email);

        if (!verifiedEmail) {
            throw new Error("Email is not in the System or its mispelled. Check again");
        }
        savedPasswordHash = await AuthenticationModel.verifyPassword(userInformation.email);

        if (!argon2.verify(savedPasswordHash, userInformation.password)) {
            throw new Error('Incorrect password');
        }
        else {
            let jwtParams: JSON;
            jwtParams = await AuthenticationModel.obtainJWTParams(userInformation.email);
            console.log(accessToken);
            accessToken = await this.generateJwtToken(jwtParams);
        }
        return accessToken;
    }


}

