import { Request, Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { AdminManagementController } from '../../controllers/AdminManagementController';

describe('Fetch All Categories Materials Controller ', () => {
    let mockRequest;
    let mockResponse;
    let controller: AdminManagementController;

    beforeEach(async () => {
        try {
            await createConnection();
        } catch (error) {
            // If AlreadyHasActiveConnectionError occurs, return already existent connection
            if (error.name === "AlreadyHasActiveConnectionError") {
                return getConnectionManager().get();
            }
        }
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
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 400, "User does not have admin permissions!")
    });

    test('Valid Set User as Admin Request', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com',
                operation: 'add'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 200, "User successfully given admin permissions")
    });

    test('Valid Remove Admin Permissions Request', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com',
                operation: 'remove'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 200, "Admin permissions successfully revoked")
    });

    test('Invalid Set User as Admin Request; user already admin', async () => {
        mockRequest = {
            body: {
                email: 'j@kj.com',
                operation: 'add'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 400, "User is already an administrator!")
    });

    test('Invalid Admin Permissions Change; Invalid Operation', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com',
                operation: 'dewfewfwef'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid permission update operation entered")
    });

    test('Invalid Admin Permissions Change; No Operation', async () => {
        mockRequest = {
            body: {
                email: 'admin@potential.com'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 400, "Request is invalid. Missing attributes")
    });

    test('Invalid Admin Permissions Change; No Email', async () => {
        mockRequest = {
            body: {
                operation: 'add'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 400, "Request is invalid. Missing attributes")
    });

    test('Invalid Set User as Admin Request; Non-existant Email/User', async () => {
        mockRequest = {
            body: {
                email: 'no@potential.com',
                operation: 'add'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 404, "No such user exists")
    });

    test('Invalid Remove Admin Permissions Request; Non-existant Email/User', async () => {
        mockRequest = {
            body: {
                email: 'no@potential.com',
                operation: 'remove'
            }
        }
        await updatePermissionWithAssert(mockRequest as Request, mockResponse as Response, 404, "No such user exists")
    });

    async function updatePermissionWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await controller.createPermissionUpdateRequest(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }
})