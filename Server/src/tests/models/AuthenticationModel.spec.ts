import { createConnection, getConnection, TableForeignKey } from 'typeorm';
import { AuthenticationModel } from '../../models/AuthenticationModel';
import { ISignUpInformation } from '../../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../../genericInterfaces/AuthenticationInterfaces';


describe('Authentication Model Methods', () => {

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        //need to increase from default to allow for DB connection
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Inserting new user into database by SignUp - Pass', async () => {
        let signUpInfo: ISignUpInformation = {
            email: 'j.com',
            password: '123',
            isAdmin: false,
            organizationName: 'Mugiwara',
            dateOfBirth: '1980-01-01' as any,
            firstName: 'Ace',
            lastName: 'FireFist'
        }
        let res = await AuthenticationModel.insertSignUpInformation(signUpInfo);
        expect(res).toBeUndefined();
    });

    test('Checking Database if Email Exists - Return true', async () => {
        let email: string = 'j.comkj'
        let res = await AuthenticationModel.verifyIfEmailExists(email);
        expect(res).toBeTruthy();
    });

    test('Checking Database if Email Exists - Return false', async () => {
        let email: string = 'j.comkj4wfwefwefwefw'
        let res = await AuthenticationModel.verifyIfEmailExists(email);
        expect(res).toBeFalsy();
    });

    //CHECK
    test('Checking Database if User is Admin - true', async () => {
        let email: string = 'j.comkj'
        let res = await AuthenticationModel.isAdminStatus(email);
        expect(res).toBe(1);
    });

    test('Checking Database if User is Admin - false', async () => {
        let email: string = 'j.com'
        let res = await AuthenticationModel.isAdminStatus(email);
        expect(res).toBe(0);
    });

    test('Obtaining User JWT params from Database', async () => {
        let email: string = 'j.comkj'
        let mockResponse = {
            'account_admin': 1,
            'account_firstName': 'Ace',
            'account_id': 1
        }
        let res = await AuthenticationModel.obtainJWTParams(email);
        expect(res.account_admin).toBe(mockResponse.account_admin);
        expect(res.account_firstName).toBe(mockResponse.account_firstName)
        expect(res.account_id).toBe(mockResponse.account_id)
    });

    //for testing userPasswordUpdate
    test('updating users password inside the database - Return true', async () => {
        let email: string = 'j.com'
        let passwordHash: string = '456'
        let res = await AuthenticationModel.updateUserPasswordDetail(email, passwordHash);

        expect(res).toBe(true);
    });
    test('updating users password inside the database - Return false', async () => {
        let email: string = 'jkbh.com'
        let passwordHash: string = '456'
        let res = await AuthenticationModel.updateUserPasswordDetail(email, passwordHash);

        expect(res).toBe(false);
    });
    //for testing userOrganizationNameUpdate
    test('updating users organization name inside the database - Return true', async () => {
        let email: string = 'j.com'
        let organizationName = 'Shichibukai'
        let res = await AuthenticationModel.updateUserPasswordDetail(email, organizationName);

        expect(res).toBe(true);
    });
    test('updating users organization name inside the database - Return false', async () => {
        let email: string = 'jackA55 .com'
        let organizationName = 'Shichibukai'
        let res = await AuthenticationModel.updateUserPasswordDetail(email, organizationName);

        expect(res).toBe(false);
    });
});
