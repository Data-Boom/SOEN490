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
    let expectedRespons = 'ewrw'
    mockRequest = {
      params: 1 as Number
    }
    await SavedGraphsController.createRequestForOneSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedRespons);
    expect(mockResponse.status).toBeCalledWith(200);

  });

  test('Invalid GraphID Request', async () => {
    mockRequest = {
      params: {
        oneSavedGraph: 'werwer'
      }

    }
    await SavedGraphsController.createRequestForOneSavedGraph(mockRequest as Request, mockResponse as Response)
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
