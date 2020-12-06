import { Connection, getConnection } from 'typeorm';

import { Accounts } from './entities/Accounts'

interface ISignUpInformation {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    organizationName: string,
    admin: string
}

export class AuthenticationModel {
    constructor() {
    }

    static async insertSignUpInformation(email: string, password: string, firstName: string, lastName: string, dateOfBirth: Date, organizationName: string, isAdmin: string) {

        let connection = getConnection();

        let signUpInformation = new Accounts();
        signUpInformation.id;
        signUpInformation.email = email;
        signUpInformation.password = password;
        signUpInformation.firstName = firstName;
        signUpInformation.lastName = lastName;
        signUpInformation.dateOfBirth = dateOfBirth;
        signUpInformation.organizationName = organizationName;
        signUpInformation.admin = isAdmin;
        await connection.manager.save(signUpInformation);
    }

    static async verifyIfEmailExists(email: string): Promise<any> {

        let connection = getConnection();
        let userEmail = await connection.getRepository(Accounts)
            .createQueryBuilder('accounts')
            .where('accounts.email = :email', { email: email })
            .getOne()
        console.log(userEmail)

        return userEmail !== undefined;
    }


    static async verifyPassword(email: string): Promise<any> {

        let connection = getConnection();
        let userInfo = await connection.manager
            .createQueryBuilder(Accounts, 'account')
            .select('account.email', 'account_email')
            .select('account.password', 'account_password')
            .where('account.email = :email', { email: email })
            .getRawMany();
        return userInfo[0].account_password;
    }

    static async verifyAdminStatus(email: string): Promise<any> {

        let adminStatus: any;
        let connection = getConnection();
        adminStatus = await connection.manager
            .createQueryBuilder(Accounts, 'account')
            .select('account.admin', 'account_admin')
            .where('account.email = :email', { email: email })
            .getRawOne();
        return adminStatus.account_admin;
    }

    static async obtainJWTParams(email: string): Promise<any> {

        let connection = getConnection();
        let jwtParams: JSON[];
        jwtParams = await connection.manager
            .createQueryBuilder(Accounts, 'account')
            .select('account.id', 'account_id')
            .addSelect('account.email', 'account_email')
            .addSelect('account.admin', 'account_admin')
            .where('account.email = :email', { email: email })
            .getRawMany();
        return jwtParams[0];
    }

    static async resetPassword(email: string) {

        let connection = getConnection();
    }

    static async deleteAccounts(email: string) {

        let connection = getConnection();
    }
}