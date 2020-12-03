import { Connection, getConnection } from 'typeorm';

import { Accounts } from './entities/Accounts'


export class AuthenticationModel {
    constructor() {
    }

    async insertSignUpInformation(userSignUpInfo: any) {
        let connection = getConnection();

        let signUpInformation = new Accounts();
        signUpInformation.id;
        signUpInformation.email = userSignUpInfo.email;
        signUpInformation.password = userSignUpInfo.password;
        signUpInformation.firstName = userSignUpInfo.firstName;
        signUpInformation.lastName = userSignUpInfo.lastName;
        signUpInformation.dateOfBirth = userSignUpInfo.dateOfBirth;
        signUpInformation.organizationName = userSignUpInfo.organizationName;
        signUpInformation.securityQuestion = userSignUpInfo.securityQuestion;
        signUpInformation.securityAnswer = userSignUpInfo.securityAnswer;
        signUpInformation.admin = userSignUpInfo.isAdmin;
        await connection.manager.save(signUpInformation);
    }

    async verifyEmail(email: string): Promise<any> {

        let connection = getConnection();
        let userEmail = await connection.manager
            .createQueryBuilder(Accounts, 'account')
            .where('entity.email= :email', { email: email })
            .getOne();
        return userEmail !== undefined;
    }


    async verifyPassword(email: string): Promise<any> {

        let connection = getConnection();
        let userPassword = await connection.manager
            .createQueryBuilder(Accounts, 'account')
            .select('account.email', 'account_email')
            .select('account.password', 'account_password')
            .where('account.email = :email', { email: email })
            .getRawMany();
        console.log(userPassword);
        return userPassword;
    }

    async resetPassword(email: string) {

        let connection = getConnection();
    }

    async deleteAccounts(email: string) {

        let connection = getConnection();
    }
}