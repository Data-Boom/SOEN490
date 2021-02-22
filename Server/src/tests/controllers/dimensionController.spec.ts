import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';

import { DimensionsController } from '../../controllers/DimensionsController';

describe('Dimensions Controller', () => {
  let mockRequest;
  let mockResponse;
  let next;
  let dimensionsController: DimensionsController;

  beforeEach(async () => {
    await createConnection();
    jest.setTimeout(60000)
    dimensionsController = new DimensionsController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      cookie: jest.fn(),
      json: jest.fn(),
      setHeader: jest.fn()
    }
    next = {};
  });

  afterEach(async () => {
    await getConnection().close();
  });

  // Test Cases for Create Dimension

  test('Valid Create Dimension Request', async () => {
    const expectedResponse = {
      "baseUnitId": 7761,
      "id": 13,
      "name": "Velocity",
      "units": [
        {
          "conversionFormula": "{u}",
          "dimensionId": 13,
          "id": 7761,
          "name": "m/s"
        }
      ]
    };
    mockRequest = {
      body: {
        name: "Velocity",
        units: [
          {
            name: "m/s",
            conversionFormula: "{u}"
          }
        ]
      }
    }
    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(201);
  });


  test('Invalid Create Dimension Request due to missing parameters - Error 400', async () => {
    const expectedResponse = "Request is invalid. Missing attributes";
    mockRequest = {
      body: {
        unit: 0
      }
    }

    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  test('Invalid Create Dimension with duplicate entry - Error 400', async () => {
    const expectedResponse = "This dimension already exists! Please use different values";
    mockRequest = {
      body: {
        name: "Velocity",
        units: [
          {
            name: "m/s",
            conversionFormula: "{u}"
          }
        ]
      }
    }

    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  // Test Cases for Get Dimension

  test('Valid Request to Get Dimensions', async () => {
    const expectedResponse = [
      {
        "baseUnitId": null,
        "id": 2,
        "name": "Density",
        "units": [

        ]
      },
      {
        "baseUnitId": 7761,
        "id": 13,
        "name": "Velocity",
        "units": [
          {
            "conversionFormula": "{u}",
            "dimensionId": 13,
            "id": 7761,
            "name": "m/s"
          }
        ]
      }
    ];
    await dimensionsController.retrieveDimensions(mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  // Test Cases for Updating Dimension

  test('Valid Update Dimension Request', async () => {
    const expectedResponse = "Success";
    mockRequest = {
      body: {
        name: "Velocity",
        id: 1,
        units: [
          {
            name: "m/s",
            conversionFormula: "{u^2}"
          }
        ]
      }
    }
    await dimensionsController.updateDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Invalid Update Dimension Request due to missing parameters - Error 400', async () => {
    const expectedResponse = "Request is invalid. Missing attributes";
    mockRequest = {
      body: {
        unit: 0
      }
    }

    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  // Test Cases for Delete Dimension

  test('Valid Case to Delete Dimension', async () => {
    const expectedResponse = "Success";
    mockRequest = {
      params: {
        id: 1
      }
    }

    await dimensionsController.deleteDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

})
