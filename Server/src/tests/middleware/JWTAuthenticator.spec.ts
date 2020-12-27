import { Request, Response, NextFunction, response } from 'express';
import { AuthenticationController } from '../../controllers/authenticationController';
import { JWTAuthenticator } from '../../middleware/JWTAuthenticator';
import { createConnection, getConnection } from 'typeorm';
import request from 'supertest';
import { loadStartupProcess } from '../../loaders/loadStartupProcess';



describe('Authorization Middleware', () => {
    let mockRequest;
    let mockResponse;
    let newRequest;
    let anotherResponse;
    let nextFunction: NextFunction = jest.fn();

    beforeAll(async () => {
        mockRequest = {} as Request;
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
            setHeader: jest.fn(() => mockResponse)
        }
        anotherResponse = {
            status: jest.fn(() => anotherResponse),
            json: jest.fn(),
            setHeader: jest.fn(() => anotherResponse)
        }
        newRequest = {} as Request;
        await createConnection();
        jest.setTimeout(60000)
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Request Without Auth Headers - Return error 401', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };
        mockRequest = {
            headers: {
            }
        }
        await JWTAuthenticator.verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

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
        await JWTAuthenticator.verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

        expect(mockResponse.status).toBeCalledWith(403);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    // test('Request with Auth Header & Correct JWT Token Provided', async () => {

    // Leaving this here - unfinished testing
    // let startup: loadStartupProcess;
    // startup = await new loadStartupProcess();
    // let token;
    // token = await request.agent(startup.getApp())
    //     .post('/login')
    //     .send({
    //         query: {
    //             email: 'test@t.com',
    //             password: '123'
    //         }
    //     });
    // console.log(token);
    //     mockRequest = {
    //         query: {
    //             email: 'test@t.com',
    //             password: '123'
    //         }
    //     }
    //     let authenticationController = new AuthenticationController();
    //     await authenticationController.createLoginRequest(mockRequest as Request, anotherResponse as Response, nextFunction as NextFunction);
    //     newRequest = {
    //         headers: {
    //             'authorization': `${anotherResponse.json}`
    //         }
    //     }
    //     // expect(anotherResponse.json).toBeCalledWith(200);
    //     await JWTAuthenticator.verifyJWT(newRequest as Request, mockResponse as Response, nextFunction as NextFunction);
    //     expect(mockResponse.json).toBeCalledWith(200);
    //     //expect(nextFunction).toHaveBeenCalledTimes(1);
    // })
});
