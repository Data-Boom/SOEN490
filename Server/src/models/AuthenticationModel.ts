import { getConnection } from 'typeorm';

import { Accounts } from './entities/Accounts'
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces'


export class AuthenticationModel {

    static async insertSignUpInformation(signUpInfo: ISignUpInformation) {

        let connection = getConnection();

        let signUpInformation = new Accounts();
        signUpInformation.id;
        signUpInformation.email = signUpInfo.email;
        signUpInformation.password = signUpInfo.password;
        signUpInformation.firstName = signUpInfo.firstName;
        signUpInformation.lastName = signUpInfo.lastName;
        signUpInformation.dateOfBirth = signUpInfo.dateOfBirth;
        signUpInformation.organizationName = signUpInfo.organizationName;
        signUpInformation.admin = signUpInfo.isAdmin;
        await connection.manager.save(signUpInformation);
    }

    static async verifyIfEmailExists(email: string): Promise<any> {

        let connection = getConnection();
        let userEmail = await connection.getRepository(Accounts)
            .createQueryBuilder('accounts')
            .where('accounts.email = :email', { email: email })
            .getOne()

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

    static async verifyAdminStatus(email: string): Promise<boolean> {

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
            .addSelect('account.firstName', 'account_firstName')
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