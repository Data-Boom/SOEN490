import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { validDimensionData, invalidDeleteDimensionDataUnitInUse, invalidDimensionData, availableDBDimensions, duplicateDimensionData, validDeleteDimensionData, validUpdateDimensionData } from '../testData/dimensionTestData';
import { DimensionsController } from '../../controllers/DimensionsController';

describe('Dimensions Controller', () => {
  let dimensionsController: DimensionsController;
  let mockRequest;
  let mockResponse;

  beforeEach(async () => {
    await createConnection();
    jest.setTimeout(60000)
    dimensionsController = new DimensionsController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    }
  });

  afterEach(async () => {
    await getConnection().close();
  });

  // Test Cases for Get Dimension

  test('Valid Request to Get Dimensions', async () => {
    const expectedResponse = availableDBDimensions;
    await dimensionsController.retrieveDimensions(mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  // Test Cases for Create Dimension
  test('Valid Create Dimension Request', async () => {
    mockRequest = {
      body: validDimensionData
    }
    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).not.toBeUndefined;
    expect(mockResponse.status).toBeCalledWith(201);
  });

  test('Invalid Create Dimension Request due to missing parameters - Error 400', async () => {
    const expectedResponse = "Request is invalid. Missing attributes";
    mockRequest = {
      body: invalidDimensionData
    }
    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  test('Invalid Create Dimension with duplicate entry - Error 400', async () => {
    const expectedResponse = "This dimension already exists! Please use different values";
    mockRequest = {
      body: duplicateDimensionData
    }

    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  // Test Cases for Updating Dimension

  test('Valid Update Dimension Request', async () => {
    const expectedResponse = validUpdateDimensionData
    mockRequest = {
      body: validUpdateDimensionData
    }
    await dimensionsController.updateDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Invalid Update Dimension Request due to missing parameters - Error 400', async () => {
    const expectedResponse = "Request is invalid. Missing attributes";
    mockRequest = {
      body: invalidDimensionData
    }

    await dimensionsController.createDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  // Test Cases for Delete Dimension

  test('Valid Case to Delete Dimension', async () => {
    const expectedResponse = "Success";
    mockRequest = {
      params: validDeleteDimensionData
    }
    await dimensionsController.deleteDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Invalid Case to Delete Dimension - Unit in use', async () => {
    const expectedResponse = "Can't remove a unit as it is used by one or more data points";
    mockRequest = {
      params: invalidDeleteDimensionDataUnitInUse
    }
    await dimensionsController.deleteDimension(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith(expectedResponse)
  });

})
