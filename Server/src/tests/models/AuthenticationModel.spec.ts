import { createConnection, getConnection, TableForeignKey } from 'typeorm';
import { AuthenticationModel } from '../../models/AuthenticationModel';
import { ISignUpInformation } from '../../genericInterfaces/AuthenticationInterfaces';
import { ILoginInformation } from '../../genericInterfaces/AuthenticationInterfaces';


describe('Authentication Model Methods', () => {

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000) //need to increase from default to allow for DB connection
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Inserting new user into database by SignUp - Pass', async () => {
        let signUpInfo: ISignUpInformation = {
            email: 'j.comkj',
            password: '123',
            isAdmin: false,
            organizationName: 'Mugiwara',
            dateOfBirth: '1980-01-01' as any,
            firstName: 'Ace',
            lastName: 'FireFist'
        }
        let res = await AuthenticationModel.insertSignUpInformation(signUpInfo);
        expect(res).toBeUndefined();
        console.log('Inserting new user into database by SignUp');
    });

    test('Checking Database if Email Exists - Return true', async () => {
        let email: string = 'j.comkj'
        let res = await AuthenticationModel.verifyIfEmailExists(email);
        expect(res).toBeTruthy();
        console.log('Checking Database if Email Exists - true');
    });

    test('Checking Database if Email Exists - Return false', async () => {
        let email: string = 'j.comkj4wfwefwefwefw'
        let res = await AuthenticationModel.verifyIfEmailExists(email);
        expect(res).toBeFalsy();
        console.log('Checking Database if Email Exists - return false');
    });

    test('Checking Database if User Hash Exists - true', async () => {
        let email: string = 'j.comkj'
        let mockRes = '$argon2i$v=19$m=4096,t=3,p=1$UAYbLcgcN4aECpcIjJz1DQ$/L4U//lZfi8WNw1IzeDbkecqq/KJss7OkoRvrX00d4Q';
        let res = await AuthenticationModel.getPasswordHash(email);
        expect(res).toBe(mockRes);
        console.log('Checking Database if User Hash Exists - true');
    });

    // test('Checking Database if User Hash Exists - Return false', async () => {
    //     let email: string = 'j.comkwecwewcwewwej'
    //     let res = await AuthenticationModel.getPasswordHash(email);
    //     expect(res).toBeUndefined();
    //     console.log('Checking Database if User Hash Exists - false');
    // });

    test('Checking Database if User is Admin - true', async () => {
        let email: string = 'tester.coma'
        let res = await AuthenticationModel.isAdminStatus(email);
        expect(res).toBe(1);
        console.log('Checking Database if User is Admin - true');
    });

    test('Checking Database if User is Admin - false', async () => {
        let email: string = 'j.comkj'
        let res = await AuthenticationModel.isAdminStatus(email);
        expect(res).toBe(0);
        console.log('Checking Database if User is Admin - true');
    });

    test('Obtaining User JWT params from Database', async () => {
        let email: string = 'j.comkj'
        let mockResponse = {
            'account_admin': 0,
            'account_firstName': 'g',
            'account_id': 3
        }
        let res = await AuthenticationModel.obtainJWTParams(email);
        expect(res.account_admin).toBe(mockResponse.account_admin);
        expect(res.account_firstName).toBe(mockResponse.account_firstName)
        expect(res.account_id).toBe(mockResponse.account_id)
        console.log('Obtaining User JWT params from Database');
    });

});
