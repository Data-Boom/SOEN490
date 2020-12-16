import { Request, Response, NextFunction } from 'express';
import { AuthenticationController } from '../../controllers/authenticationController';

describe('Authentiication Controller', () => {
    let mockRequest;
    let mockResponse;
    let next;
    let authenticationController: AuthenticationController;


    beforeEach(() => {
        authenticationController = new AuthenticationController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn()
        }
        next = {};
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
})