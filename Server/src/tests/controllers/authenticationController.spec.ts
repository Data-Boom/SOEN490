import { NextFunction, Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';

import { AuthenticationController } from '../../controllers/authenticationController';
import { Accounts } from '../../models/entities/Accounts';
import { AuthenticationService } from '../../services/authenticationService';

describe('Authentication Controller', () => {
    let mockRequest;
    let mockResponse;
    let next;
    let connection
    let authenticationController: AuthenticationController;

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        authenticationController = new AuthenticationController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            cookie: jest.fn(),
            json: jest.fn(),
            setHeader: jest.fn()
        }
        next = {};

        connection = getConnection();

        // Accounts Data
        let authenticationService = new AuthenticationService();

        let user1 = new Accounts();
        user1.id = 1;
        user1.email = 'j.comkj';
        user1.password = await authenticationService.hashPassword('123') as any;
        user1.firstName = 'Ace';
        user1.lastName = 'FireFist';
        user1.dateOfBirth = '1980-01-01' as any;
        user1.organizationName = 'Mugiwara';
        user1.admin = !!true;
        await connection.manager.save(user1);

        let user2 = new Accounts();
        user2.id = 2;
        user2.email = 'test@t.com';
        user2.password = await authenticationService.hashPassword('123') as any;
        user2.firstName = 'Tom';
        user2.lastName = 'Happy';
        user2.dateOfBirth = '1980-01-01' as any;
        user2.organizationName = 'Mobil';
        user2.admin;
        await connection.manager.save(user2);

        let user3 = new Accounts();
        user3.id = 3;
        user3.email = 'tester@123.com';
        user3.password = await authenticationService.hashPassword('123') as any;
        user3.firstName = 'Wyatt';
        user3.lastName = 'forfore';
        user3.dateOfBirth = '1980-01-01' as any;
        user3.organizationName = 'Ozark';
        user3.admin = !!true;
        await connection.manager.save(user3);
    });

    afterEach(async () => {

        await connection.query('DELETE FROM accounts');
        await connection.query('ALTER TABLE accounts AUTO_INCREMENT = 1');

        await getConnection().close();
    });

    test('Valid SignUp Request', async () => {
        const expectedResponse = "Success";
        mockRequest = {
            body: {
                email: 'j.comkj23r23r23r23r2',
                password: '123',
                isAdmin: 'false',
                organizationName: 'Mugiwara',
                dateOfBirth: '1980-01-01',
                firstName: 'Ace',
                lastName: 'FireFist'
            }
        }
        await authenticationController.createSignUpRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('Invalid SignUp Request due to missing parameters - Error 400', async () => {
        const expectedResponse = "Request is invalid. Missing attributes";
        mockRequest = {
            body: {
                email: 'g@123'
            }
        }

        await authenticationController.createSignUpRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('Invalid Sign Up with Duplicate Email in System - Error 400', async () => {
        const expectedResponse = "Email already exists! Please enter a different email address";
        mockRequest = {
            body: {
                email: 'j.comkj',
                password: '123',
                isAdmin: 'false',
                organizationName: 'Mugiwara',
                dateOfBirth: '1980-01-01',
                firstName: 'Ace',
                lastName: 'FireFist'
            }
        }

        await authenticationController.createSignUpRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('Invalid Logic Request due to missing parameters - Error 400', async () => {
        const expectedResponse = "Request is invalid. Email or Password attribute missing";
        mockRequest = {
            body: {
                email: 'g@123'
            }
        }

        await authenticationController.createLoginRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('Login with unregistered Email - Error 400', async () => {
        const expectedResponse = "Email is not in the System or its mispelled. Check Again";
        mockRequest = {
            body: {
                email: 'j.comkwgwegwegwegw',
                password: '123',
            }
        }

        await authenticationController.createLoginRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });


    test('Valid Request to get UserDetails', async () => {
        const expectedResponse = {
            "account_email": "j.comkj",
            "account_firstName": "Ace",
            "account_lastName": "FireFist",
            "account_dateOfBirth": "1980-01-01T00:00:00.000Z",
            "account_organizationName": "Mugiwara"
        }
        mockRequest = {
            query: {
                email: 'j.comkj',
            }
        }
        await authenticationController.createFetchUserDetailsRequest(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('Invalid Request to get UserDetails - Bad Email Error 400', async () => {
        const expectedResponse = "Cannot fetch details for this email";
        mockRequest = {
            query: {
                email: 'j.comksefsfsj',
            }
        }

        await authenticationController.createFetchUserDetailsRequest(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('Valid Login Request', async () => {
        mockRequest = {
            body: {
                email: 'tester@123.com',
                password: '123'
            }
        }
        let regex: RegExp = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
        //
        await authenticationController.createLoginRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(regex.test(mockResponse.json));
        expect(mockResponse.status).toBeCalledWith(200);
    });

    //to fix
    test('valid user detail update request', async () => {
        const expectedResponse = "Success";

        mockRequest = {
            body: {
                email: 'test@t.com',
                password: '456',
                organizationName: 'soen490'
            }
        }
        await authenticationController.updateUserDetailRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('invalid user detail update request', async () => {
        const expectedResponse = "Email cannot be found. Request declined";

        mockRequest = {
            body: {
                email: '',
                password: '456',
                organizationName: 'soen490'
            }
        }
        await authenticationController.updateUserDetailRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('invalid user detail update request, missing password and organization name', async () => {
        const expectedResponse = "Request is invalid";

        mockRequest = {
            body: {
                email: 'test@t.com',

            }
        }
        await authenticationController.updateUserDetailRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    })
})
