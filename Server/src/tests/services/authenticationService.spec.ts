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

    test('Test Load User Details Function', async () => {
        const expectedResponse = {
            "account_email": "j.comkj",
            "account_firstName": "Ace",
            "account_lastName": "FireFist",
            "account_dateOfBirth": "1980-01-01T00:00:00.000Z",
            "account_organizationName": "Mugiwara"
        }
        let userEmail: string = "j.comkj";
        let res: any = await authenticationService.loadUserDetails(userEmail);
        expect(res.statusCode).toBe(200);
        expect(res.message).toStrictEqual(JSON.stringify(expectedResponse));
    });

})