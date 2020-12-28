import { Request, Response, NextFunction } from 'express';
import { createConnection, getConnection } from 'typeorm';
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







})