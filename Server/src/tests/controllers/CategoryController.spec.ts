import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { CategoryController } from '../../controllers/CategoryController';

describe('Category Controller', () => {
    let mockRequest;
    let mockResponse;
    let controller: CategoryController;
    let validUploadData = {
        "name": "new category",
        "subcategories": [
            {
                "name": "created subcategory"
            }
        ]
    }

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        controller = new CategoryController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Valid Get All Categories Request; expect at least one entry in return', async () => {
        await controller.retrieveCategories(mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Create Category Request; expect at least one entry in return', async () => {
        mockRequest = {
            body: validUploadData
        }
        await controller.createCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(201);
    });

    test('Invalid Create Category Request', async () => {
        mockRequest = {
            body: {}
        }
        await controller.createCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Request is invalid. Please enter a category name");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Update Category Request; no id', async () => {
        mockRequest = {
            body: { "name": "name only" }
        }
        await controller.updateCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Request is invalid. Missing attributes");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Update Category Request; no name', async () => {
        mockRequest = {
            body: { "id": 1 }
        }
        await controller.updateCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Request is invalid. Missing attributes");
        expect(mockResponse.status).toBeCalledWith(400);
    });
})