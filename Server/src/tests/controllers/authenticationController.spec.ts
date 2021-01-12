import { Request, Response, NextFunction } from 'express';
import { AuthenticationController } from '../../controllers/authenticationController';
import { createConnection, getConnection } from 'typeorm';

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
            query: {
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
            query: {
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
            query: {
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
            query: {
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
            query: {
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
            query: {
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
            query: {
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
            query: {
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
            query: {
                email: 'test@t.com',

            }
        }
        await authenticationController.updateUserDetailRequest(mockRequest as Request, mockResponse as Response, next as NextFunction)
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    })
})
