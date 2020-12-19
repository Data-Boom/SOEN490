import { Request, Response, NextFunction } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { AuthenticationService } from '../../services/authenticationService'


describe('Authentication tests', () => {
    let mockRequest;
    let mockResponse;
    let next;
    let authenticationService: AuthenticationService;

    beforeAll(async () => {
        await createConnection();
        jest.setTimeout(60000) //need to increase from default to allow for DB connection
    });

    afterAll(async () => {
        await getConnection().close();
    });

    beforeEach(() => {
        authenticationService = new AuthenticationService();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn()
        }
        next = {};
    });

    test('Test hashing function', async () => {
        let regexp: RegExp = /$argon2i$v/;
        let userPassword: string = "123";
        let passwordHash: string = await authenticationService.hashPassword(userPassword)
        expect(regexp.test(passwordHash));
    });







})