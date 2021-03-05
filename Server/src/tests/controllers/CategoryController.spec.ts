import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { CategoryController } from '../../controllers/CategoryController';
import { validUploadData, invalidUpdateData1, validUpdateData1, validUpdateData2 } from '../testData/categoryTestData';

describe('Category Controller', () => {
    let mockRequest;
    let mockResponse;
    let controller: CategoryController;

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
    test('Invalid Create Category Request; category exists', async () => {
        mockRequest = {
            body: { name: "cell size" }
        }
        await controller.createCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("This category already exists! Please use a different name");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Update Category Request; no id', async () => {
        mockRequest = {
            body: { "name": "name only" }
        }
        await controller.updateCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Request is invalid. Missing category name and/or category id");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Update Category Request; no name', async () => {
        mockRequest = {
            body: { "id": 1 }
        }
        await controller.updateCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Request is invalid. Missing category name and/or category id");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Update Category Request; delete in-use subcategory', async () => {
        mockRequest = {
            body: invalidUpdateData1
        }
        await controller.updateCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Can't remove a subcategory as it in use by one or more data sets");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Valid Update Category Request; no subcategory deletion', async () => {
        mockRequest = {
            body: validUpdateData1
        }
        await controller.updateCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(validUpdateData1);
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Update Category Request; delete a subcategory', async () => {
        mockRequest = {
            body: validUpdateData2
        }
        await controller.updateCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(validUpdateData2);
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Delete Category Request', async () => {
        mockRequest = {
            params: { "id": 4 }
        }
        await controller.deleteCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Success");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Delete Category Request; category ID does not exist', async () => {
        mockRequest = {
            params: { "id": 4 }
        }
        await controller.deleteCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Success");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Delete Category Request', async () => {
        mockRequest = {
            params: { "id": 1 }
        }
        await controller.deleteCategory(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Can't remove a category as it in use by one or more data sets");
        expect(mockResponse.status).toBeCalledWith(400);
    });

})