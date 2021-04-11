import { Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { VariableController } from '../../controllers/VariableController';

describe('Fetch All Variables Controller', () => {
  let mockResponse;
  let controller: VariableController;

  beforeAll(async () => {
    try {
      await createConnection();
    } catch (error) {
      // If AlreadyHasActiveConnectionError occurs, return already existent connection
      if (error.name === "AlreadyHasActiveConnectionError") {
        return getConnectionManager().get();
      }
    }
    jest.setTimeout(60000)
    controller = new VariableController();
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    }
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Valid Get All Variables Request; expect at least one entry in return', async () => {
    await controller.retrieveVariables(mockResponse as Response)
    expect(mockResponse.json[0]).not.toBeUndefined;
    expect(mockResponse.status).toBeCalledWith(200);
  });
})