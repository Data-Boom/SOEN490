import { Connection, getConnection } from 'typeorm';

import { Accounts } from './entities/Accounts'


export class AuthenticationModel {
    constructor() {
    }

    async insertSignUpInformation(email: string, password: string, firstName: string, lastName: string, dateOfBirth: Date, organizationName: string, securityQuestion: string, securityAnswer: string, isAdmin: boolean) {

        let connection = getConnection();

        let signUpInformation = new Accounts();
        signUpInformation.id;
        signUpInformation.email = email;
        signUpInformation.password = password;
        signUpInformation.firstName = firstName;
        signUpInformation.lastName = lastName;
        signUpInformation.dateOfBirth = dateOfBirth;
        signUpInformation.organizationName = organizationName;
        signUpInformation.securityQuestion = securityQuestion;
        signUpInformation.securityAnswer = securityAnswer;
        signUpInformation.admin = isAdmin;
        await connection.manager.save(signUpInformation);
    }

    async verifyCredentials(email: string, password: string) {

        let connection = getConnection();
        let userCredentials = await connection.manager
            .createQueryBuilder(Accounts, 'account')
            .select('account.password', 'account_password')
            .where('account.email = :email', { email: email })
            .getRawMany();
        console.log(userCredentials);
    }

    async resetPassword(email: string) {

        let connection = getConnection();
    }

    async deleteAccounts(email: string) {

        let connection = getConnection();
    }
}