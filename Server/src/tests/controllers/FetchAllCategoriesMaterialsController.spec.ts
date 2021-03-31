import { Request, Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { fetchAllCategoriesMaterialsController } from '../../controllers/fetchAllCategoriesMaterialsController';

describe('Fetch All Categories Materials Controller ', () => {
  let mockRequest;
  let mockResponse;
  let controller: fetchAllCategoriesMaterialsController;

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
    controller = new fetchAllCategoriesMaterialsController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    }
  });

  afterEach(async () => {
    await getConnection().close();
  });

  test('Valid Get All Materials Request; expect at least one entry in return', async () => {
    await controller.createRequestForAllMaterials(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json[0]).not.toBeUndefined;
    expect(mockResponse.status).toBeCalledWith(200);
  });
})