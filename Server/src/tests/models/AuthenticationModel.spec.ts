import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { AuthenticationModel } from '../../models/AuthenticationModel';
import { ISignUpInformation } from '../../genericInterfaces/AuthenticationInterfaces';


describe('Authentication Model Methods', () => {

    beforeEach(async () => {
        try {
            await createConnection();
        } catch (error) {
            // If AlreadyHasActiveConnectionError occurs, return already existent connection
            if (error.name === "AlreadyHasActiveConnectionError") {
                const existentConn = getConnectionManager().get();
                return existentConn;
            }
        }
        jest.setTimeout(60000)
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Inserting new user into database by SignUp - Pass', async () => {
        let signUpInfo: ISignUpInformation = {
            email: 'j@kj.com',
            password: 'Abc12345!',
            isAdmin: 0,
            organizationName: 'Mugiwara',
            orcID: 123456789876543,
            firstName: 'Ace',
            lastName: 'FireFist'
        }
        let res = await AuthenticationModel.insertSignUpInformation(signUpInfo);
        expect(res).toBeUndefined();
    });

    test('Checking Database if Email Exists - Return true', async () => {
        let email: string = 'j@kj.com'
        let res = await AuthenticationModel.verifyIfEmailExists(email);
        expect(res).toBeTruthy();
    });

    test('Checking Database if Email Exists - Return false', async () => {
        let email: string = 'j@kj.com4wfwefwefwefw'
        let res = await AuthenticationModel.verifyIfEmailExists(email);
        expect(res).toBeFalsy();
    });

    //CHECK
    test('Checking Database if User is Admin - true', async () => {
        let email: string = 'j@kj.com'
        let res = await AuthenticationModel.isAdminStatus(email);
        expect(res).toBe(1);
    });

    test('Checking Database if User is Admin - false', async () => {
        let email: string = 'test@t.com'
        let res = await AuthenticationModel.isAdminStatus(email);
        expect(res).toBe(0);
    });

    test('Obtaining User JWT params from Database', async () => {
        let email: string = 'j@kj.com'
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
    //for testing userOrganizationNameUpdate
    test('updating users organization name inside the database - Return true', async () => {
        let email: string = 'j.com'
        let organizationName = 'Shichibukai'
        let res = await AuthenticationModel.updateUserOrganizationDetail(email, organizationName);

        expect(res).toBe(true);
    })
});
