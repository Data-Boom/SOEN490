import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { AdminManagementController } from '../../controllers/AdminManagementController';

describe('Fetch All Categories Materials Controller ', () => {
    let mockRequest;
    let mockResponse;
    let controller: AdminManagementController;

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        controller = new AdminManagementController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Valid Get All Admins Request; expect at least one entry in return', async () => {
        await controller.createRequestForAllAdmins(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Remove Admin Permissions Request; user not an admin', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com',
                operation: 'remove'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User does not have admin permissions!");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Valid Set User as Admin Request', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com',
                operation: 'add'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User successfully given admin permissions");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Remove Admin Permissions Request', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com',
                operation: 'remove'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Admin permissions successfully revoked");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Set User as Admin Request; user already admin', async () => {
        mockRequest = {
            body: {
                email: 'j@kj.com',
                operation: 'add'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User is already an administrator!");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Admin Permissions Change; Invalid Operation', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com',
                operation: 'dewfewfwef'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid permission update operation entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Admin Permissions Change; No Operation', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Request is invalid. Missing attributes");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Admin Permissions Change; No Email', async () => {
        mockRequest = {
            body: {
                operation: 'add'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Request is invalid. Missing attributes");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Set User as Admin Request; Non-existant Email/User', async () => {
        mockRequest = {
            body: {
                email: 'no@potential.com',
                operation: 'add'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("No such user exists");
        expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Invalid Remove Admin Permissions Request; Non-existant Email/User', async () => {
        mockRequest = {
            body: {
                email: 'no@potential.com',
                operation: 'remove'
            }
        }
        await controller.createPermissionUpdateRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("No such user exists");
        expect(mockResponse.status).toBeCalledWith(404);
    });

})