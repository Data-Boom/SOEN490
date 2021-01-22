import { NextFunction, Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';

import { savedGraphsController } from '../../controllers/savedGraphsController';

describe('SavedGraphs Controller ', () => {
  let mockRequest;
  let mockResponse;
  let SavedGraphsController: savedGraphsController;

  beforeEach(async () => {
    await createConnection();
    jest.setTimeout(60000)
    SavedGraphsController = new savedGraphsController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    }
  });

  afterEach(async () => {
    await getConnection().close();
  });

  test('Valid GraphID Request', async () => {
    let expectedResponse = {
      "datasets": [
        {
          "id": 1,
          "color": "red",
          "shape": "square",
          "isHidden": false
        }
      ],
      "name": "Test Graph",
      "axes": [
        {
          "variableName": "temperature",
          "mode": "normal",
          "zoom": 100,
          "units": "C"
        }
      ],
      "id": 1
    }
    mockRequest = {
      params: {
        oneSavedGraph: '1'
      }
    }
    await SavedGraphsController.createRequestForOneSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });
  test('Invalid GraphID Request', async () => {
    mockRequest = {
      params: {
        oneSavedGraph: 'werwer'
      }

    }
    await SavedGraphsController.createRequestForOneSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Invalid graph ID entered");
    expect(mockResponse.status).toBeCalledWith(400);
  });
  test('Non-existant GraphID Request', async () => {
    mockRequest = {
      params: {
        oneSavedGraph: '2'
      }
    }
    await SavedGraphsController.createRequestForOneSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Graph does not exist");
    expect(mockResponse.status).toBeCalledWith(400);
  });

  // test('Invalid GraphID Request', async () => {
  //   mockRequest = {
  //     params: {
  //       oneSavedGraph: 'werwer'
  //     }

  //   }
  //   await SavedGraphsController.createRequestForOneSavedGraph(mockRequest as Request, mockResponse as Response)
  //   expect(mockResponse.status).toBeCalledWith(400);

  // });
})