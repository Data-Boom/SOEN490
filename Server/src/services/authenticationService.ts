import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';

import { AuthenticationModel } from '../models/AuthenticationModel'

export class authentcationService {
    private authenticationModel: AuthenticationModel;
    private authenticationCommand: string;

    constructor(command: string) {
        this.authenticationModel = new AuthenticationModel();
        this.authenticationCommand = command;
    }

    async hashPassword(password: string): Promise<string> {

        let hashedPassword: string;
        hashedPassword = await argon2.hash(password);
        return hashedPassword;
    }

    async generateJwtToken(): Promise<JSON> {

        let accessToken: JSON;


        return accessToken;
    }

    async processSignUp(SignUpInformation: any) {

        SignUpInformation.password = this.hashPassword(SignUpInformation.password)
        this.authenticationModel.insertSignUpInformation(SignUpInformation.email, SignUpInformation.password, SignUpInformation.firstName, SignUpInformation.lastName, SignUpInformation.dateOfBirth, SignUpInformation.organizationName, SignUpInformation.securityQuestion, SignUpInformation.securityAnswer, SignUpInformation.isAdmin);
    }




}