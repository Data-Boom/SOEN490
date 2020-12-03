import * as jwt from 'jsonwebtoken';
import { AuthenticationModel } from '../models/AuthenticationModel'

export class authentcationService {
    private authenticationModel: AuthenticationModel;
    private authenticationCommand: string;

    constructor(command: string) {
        this.authenticationModel = new AuthenticationModel();
        this.authenticationCommand = command;
    }

    hashPassword(password: string): string {

        let hashedPassword: string;


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