import { Request, Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { CategoryController } from '../../controllers/CategoryController';
import { validUploadData, invalidUpdateData1, validUpdateData1, validUpdateData2 } from '../testData/categoryTestData';

describe('Category Controller', () => {
  let mockRequest;
  let mockResponse;
  let controller: CategoryController;

  beforeEach(async () => {
    try {
      await createConnection();
    } catch (error) {
      // If AlreadyHasActiveConnectionError occurs, return already existent connection
      if (error.name === "AlreadyHasActiveConnectionError") {
        const existentConn = getConnectionManager().get();
        return existentConn;
      }
    }
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
    await createCategory(mockRequest as Request, mockResponse as Response, 201)
    expect(mockResponse.json).not.toBeUndefined;
  });

  test('Invalid Create Category Request', async () => {
    mockRequest = {
      body: {}
    }
    await createCategory(mockRequest as Request, mockResponse as Response, 400)
    expect(mockResponse.json).toBeCalledWith("Request is invalid. Please enter a category name");
  });
  test('Invalid Create Category Request; category exists', async () => {
    mockRequest = {
      body: { name: "cell size" }
    }
    await createCategory(mockRequest as Request, mockResponse as Response, 400)
    expect(mockResponse.json).toBeCalledWith("This category already exists! Please use a different name");
  });

  test('Invalid Update Category Request; no id', async () => {
    mockRequest = {
      body: { "name": "name only" }
    }
    await updateCategory(mockRequest as Request, mockResponse as Response, 400, "Request is invalid. Missing category name and/or category id")
  });

  test('Invalid Update Category Request; no name', async () => {
    mockRequest = {
      body: { "id": 1 }
    }
    await updateCategory(mockRequest as Request, mockResponse as Response, 400, "Request is invalid. Missing category name and/or category id")
  });

  test('Invalid Update Category Request; delete in-use subcategory', async () => {
    mockRequest = {
      body: invalidUpdateData1
    }
    await updateCategory(mockRequest as Request, mockResponse as Response, 400, "Can't remove a subcategory as it in use by one or more data sets")
  });

  test('Valid Update Category Request; no subcategory deletion', async () => {
    mockRequest = {
      body: validUpdateData1
    }
    await updateCategory(mockRequest as Request, mockResponse as Response, 200, validUpdateData1)
  });

  test('Valid Update Category Request; delete a subcategory', async () => {
    mockRequest = {
      body: validUpdateData2
    }
    await updateCategory(mockRequest as Request, mockResponse as Response, 200, validUpdateData2)
  });

  test('Valid Delete Category Request', async () => {
    mockRequest = {
      params: { "id": 4 }
    }
    await deleteCategory(mockRequest as Request, mockResponse as Response, 200, "Success")
  });

  test('Valid Delete Category Request; category does not exist', async () => {
    mockRequest = {
      params: { "id": 0 }
    }
    await deleteCategory(mockRequest as Request, mockResponse as Response, 200, "Success")
  });

  test('Invalid Delete Category Request', async () => {
    mockRequest = {
      params: { "id": 1 }
    }
    await deleteCategory(mockRequest as Request, mockResponse as Response, 400, "Can't remove a category as it in use by one or more data sets")
  });

  async function createCategory(mockRequest: Request, mockResponse: Response, status: number) {
    await controller.createCategory(mockRequest, mockResponse)
    expect(mockResponse.status).toBeCalledWith(status);
  }

  async function updateCategory(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
    await controller.updateCategory(mockRequest, mockResponse)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(status);
  }

  async function deleteCategory(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
    await controller.deleteCategory(mockRequest, mockResponse)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(status);
  }
})