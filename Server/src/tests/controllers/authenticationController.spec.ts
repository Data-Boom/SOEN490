import { NextFunction, Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';

import { AuthenticationController } from '../../controllers/authenticationController';

describe('Authentication Controller', () => {
    let mockRequest;
    let mockResponse;
    let next;
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
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Valid SignUp Request', async () => {
        const expectedResponse = "Success";
        mockRequest = {
            body: {
                email: 'j@k.com',
                password: 'Abc12345!',
                isAdmin: 'false',
                organizationName: 'Mugiwara',
                orcID: '123456789876543',
                firstName: 'Ace',
                lastName: 'FireFist'
            }
        }
        await authenticationController.createSignUpRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(200);
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
                email: 'j@kj.com',
                password: 'Abc12345!',
                isAdmin: 'false',
                organizationName: 'Mugiwara',
                orcID: '123456789876543',
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
            "account_email": "j@kj.com",
            "account_firstName": "Ace",
            "account_lastName": "FireFist",
            "account_orcID": "123456789876543",
            "account_organizationName": "Mugiwara",
            "account_permissions": 1
        }
        mockRequest = {
            query: {
                email: 'j@kj.com',
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
