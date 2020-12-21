import { Request, Response, NextFunction } from 'express';
import { createConnection, getConnection, TableForeignKey } from 'typeorm';
import { AuthenticationService } from '../../services/authenticationService'


describe('Authentication tests', () => {
    let mockRequest;
    let mockResponse;
    let next;
    let authenticationService: AuthenticationService;

    beforeEach(async () => {

        await createConnection();
        jest.setTimeout(60000)
        authenticationService = new AuthenticationService();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn()
        }
        next = {};
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Test hashing function', async () => {
        let regexp: RegExp = /$argon2i$v/;
        let userPassword: string = "123";
        let passwordHash: string = await authenticationService.hashPassword(userPassword)
        expect(regexp.test(passwordHash));
    });

    // test('Valid Fetching User Details Request', async () => {
    //     const expectedResponse = {
    //         "account_email": "j.com",
    //         "account_firstName": "g",
    //         "account_lastName": "d23232323",
    //         "account_dateOfBirth": "1980-01-01T00:00:00.000Z",
    //         "account_organizationName": "mugiwara4545"
    //     }
    //     let userEmail: string = "j.com";
    //     let res: any = await authenticationService.loadUserDetails(userEmail);
    //     expect(res.status).toBeCalledWith(400);
    //     expect(res.message).toBe(expectedResponse);
    // });
})