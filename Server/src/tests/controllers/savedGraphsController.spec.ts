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

  test('Valid User Saved Graphs Request', async () => {
    let expectedResponse = [{
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
    }]
    mockRequest = {
      params: {
        userSavedGraphs: "j.comkj"
      }
    }
    await SavedGraphsController.createRequestForUserSavedGraphs(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Invalid User Saved Graphs Request', async () => {
    let expectedResponse = "Invalid user email provided"
    mockRequest = {
      params: {
        userSavedGraphs: "fake@email.com"
      }
    }
    await SavedGraphsController.createRequestForUserSavedGraphs(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test('Valid Graph Insert Request', async () => {
    let expectedResponse = "Graph successfully saved"
    mockRequest = {
      body: {
        "datasets": [
          {
            "id": 100,
            "color": "blue",
            "shape": "square",
            "isHidden": true
          },
          {
            "id": 101,
            "color": "green",
            "shape": "circle",
            "isHidden": false
          }
        ],
        "name": "Adding Graphset Test",
        "axes": [
          {
            "variableName": "density",
            "mode": "small",
            "zoom": 100,
            "units": "cm, C"
          },
          {
            "variableName": "temp",
            "mode": "big",
            "zoom": 100,
            "units": "cm, C"
          }
        ],
        "id": 1,
        "email": "j.comkj"
      }
    }
    await SavedGraphsController.createRequestForAddingSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Invalid Graph Insert Request', async () => {
    let expectedResponse = "Invalid user email provided"
    mockRequest = {
      body: {
        "datasets": [
          {
            "id": 100,
            "color": "blue",
            "shape": "square",
            "isHidden": true
          },
          {
            "id": 101,
            "color": "green",
            "shape": "circle",
            "isHidden": false
          }
        ],
        "name": "Adding Graphset Test",
        "axes": [
          {
            "variableName": "density",
            "mode": "small",
            "zoom": 100,
            "units": "cm, C"
          },
          {
            "variableName": "temp",
            "mode": "big",
            "zoom": 100,
            "units": "cm, C"
          }
        ],
        "id": 1,
        "email": "123@123.com"
      }
    }
    await SavedGraphsController.createRequestForAddingSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  //Do these deletion tests last
  test('Delete Graph Request', async () => {
    mockRequest = {
      params: {
        deleteSavedGraph: '1'
      }
    }
    await SavedGraphsController.createRequestForDeletingSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Saved graph deletion was successful");
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Delete Non-existant Graph Request', async () => {
    mockRequest = {
      params: {
        deleteSavedGraph: '1'
      }
    }
    await SavedGraphsController.createRequestForDeletingSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Saved graph deletion was successful");
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Invalid Delete Graph Request', async () => {
    mockRequest = {
      params: {
        deleteSavedGraph: "not a number"
      }
    }
    await SavedGraphsController.createRequestForDeletingSavedGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Invalid graph ID entered");
    expect(mockResponse.status).toBeCalledWith(400);
  });
})