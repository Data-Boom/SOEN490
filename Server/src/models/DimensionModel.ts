import { Accounts } from './entities/Accounts'
import { IFetchUserDetail } from '../genericInterfaces/AuthenticationInterfaces';
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces'
import { getConnection } from 'typeorm';
import { IDimensionModel } from './interfaces/IDimension';
import { Dimension } from './entities/Dimension';

/**
 * This model contains all methods required for obtaining data from the Accounts
 * table inside the database
 */
export class DimensionModel {

    /**
     * Method responsible for completing signup process. Extracting user information
     * and sets the entity values
     * @param signUpInfo - User Information from Frontend Request
     */
    static async insertDimension(dimensionInfo: IDimensionModel) {

        let connection = getConnection();

        let dimension = new Dimension();
        dimension.id;
        dimension.name = dimensionInfo.name;
        await connection.manager.save(dimension);
    }

    /**
     * Method to verify Email exists. Returns true or undefined
     * @param email - User Email
     */
    static async verifyIfNameExists(name: string): Promise<boolean> {

        let connection = getConnection();
        let userEmail = await connection.getRepository(Accounts)
            .createQueryBuilder('accounts')
            .where('accounts.email = :email', { email: email })
            .getOne();

        return userEmail !== undefined;
    }