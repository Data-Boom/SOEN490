import { Request, Response, NextFunction } from 'express';
import { loadStartupProcess } from '../../loaders/loadStartupProcess';
import { JWTAuthenticator } from '../../middleware/JWTAuthenticator';
import * as app from '../../app'
import request from 'supertest';

describe('Authorization Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn()
        }
    });

    test('Request Without Auth Headers - Return error 401', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };
        mockRequest = {
            headers: {
            }
        }
        await JWTAuthenticator.verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toBeCalledWith(401);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('Request containing Auth Header & Incorrect token provided - Return error 401', async () => {
        const expectedResponse = {
            "error": "JWT Token provided is incorrect"
        }
        mockRequest = {
            headers: {
                'authorization': 'Bearer abc'
            }
        }
        await JWTAuthenticator.verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toBeCalledWith(403);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    //CHECK
    // test('Request with Auth Header & Correct JWT Token Provided', async () => {

    //     const expressLoader = new loadStartupProcess();
    //     const result = await request(expressLoader.app).post('/login');

    //     mockRequest = {
    //         headers: {
    //             //'authorization': 
    //         }
    //     }
    //     await AuthenticateJWT.verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction);
    //     expect(nextFunction).toBeCalledTimes(1);
    // })
});
