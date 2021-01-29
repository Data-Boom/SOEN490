import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';

import { GraphsController } from '../../controllers/GraphsController';
import { validGraphStateData1, validGraphStateData2 } from '../testData/testData';

describe('SavedGraphs Controller ', () => {
  let mockRequest;
  let mockResponse;
  let SavedGraphsController: GraphsController;

  beforeEach(async () => {
    await createConnection();
    jest.setTimeout(60000)
    SavedGraphsController = new GraphsController();
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
    let expectedResponse = validGraphStateData1[0]
    mockRequest = {
      params: {
        graphStateId: '1'
      }
    }
    await SavedGraphsController.createRequestForSingleGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Invalid GraphID Request', async () => {
    mockRequest = {
      params: {
        graphStateId: 'werwer'
      }

    }
    await SavedGraphsController.createRequestForSingleGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Invalid graph ID entered");
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test('Non-existant GraphID Request', async () => {
    mockRequest = {
      params: {
        graphStateId: '-1'
      }
    }
    await SavedGraphsController.createRequestForSingleGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Graph does not exist");
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test('Valid User Saved Graphs Request; multiple data sets on graph', async () => {
    let expectedResponse = validGraphStateData1
    mockRequest = {
      body: {
        user: {
          account_id: '1'
        }
      }
    }
    await SavedGraphsController.createRequestForUserSavedGraphs(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  test('Valid User Saved Graphs Request; one data set on graph', async () => {
    let expectedResponse = validGraphStateData2
    mockRequest = {
      body: {
        user: {
          account_id: '2'
        }
      }
    }
    await SavedGraphsController.createRequestForUserSavedGraphs(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  });

  //   test('Valid Graph Insert Request', async () => {
  //     let expectedResponse = "Graph successfully saved"
  //     mockRequest = {
  //       body: {
  //         "datasets": [
  //           {
  //             "id": 100,
  //             "color": "blue",
  //             "shape": "square",
  //             "isHidden": true
  //           },
  //           {
  //             "id": 101,
  //             "color": "green",
  //             "shape": "circle",
  //             "isHidden": false
  //           }
  //         ],
  //         "name": "Adding Graphset Test",
  //         "axes": [
  //           {
  //             "variableName": "density",
  //             "mode": "small",
  //             "zoom": 100,
  //             "units": "cm, C"
  //           },
  //           {
  //             "variableName": "temp",
  //             "mode": "big",
  //             "zoom": 100,
  //             "units": "cm, C"
  //           }
  //         ],
  //         "id": 1,
  //         "email": "j.comkj"
  //       }
  //     }
  //     await SavedGraphsController.createRequestForAddingSavedGraph(mockRequest as Request, mockResponse as Response)
  //     expect(mockResponse.json).toBeCalledWith(expectedResponse);
  //     expect(mockResponse.status).toBeCalledWith(200);
  //   });

  //   test('Invalid Graph Insert Request', async () => {
  //     let expectedResponse = "Invalid user email provided"
  //     mockRequest = {
  //       body: {
  //         "datasets": [
  //           {
  //             "id": 100,
  //             "color": "blue",
  //             "shape": "square",
  //             "isHidden": true
  //           },
  //           {
  //             "id": 101,
  //             "color": "green",
  //             "shape": "circle",
  //             "isHidden": false
  //           }
  //         ],
  //         "name": "Adding Graphset Test",
  //         "axes": [
  //           {
  //             "variableName": "density",
  //             "mode": "small",
  //             "zoom": 100,
  //             "units": "cm, C"
  //           },
  //           {
  //             "variableName": "temp",
  //             "mode": "big",
  //             "zoom": 100,
  //             "units": "cm, C"
  //           }
  //         ],
  //         "id": 1,
  //         "email": "123@123.com"
  //       }
  //     }
  //     await SavedGraphsController.createRequestForAddingSavedGraph(mockRequest as Request, mockResponse as Response)
  //     expect(mockResponse.json).toBeCalledWith(expectedResponse);
  //     expect(mockResponse.status).toBeCalledWith(400);
  //   });

  //   //Do these deletion tests last
  //   test('Delete Graph Request', async () => {
  //     mockRequest = {
  //       params: {
  //         deleteSavedGraph: '1'
  //       }
  //     }
  //     await SavedGraphsController.createRequestForDeletingSavedGraph(mockRequest as Request, mockResponse as Response)
  //     expect(mockResponse.json).toBeCalledWith("Saved graph deletion was successful");
  //     expect(mockResponse.status).toBeCalledWith(200);
  //   });

  //   test('Delete Non-existant Graph Request', async () => {
  //     mockRequest = {
  //       params: {
  //         deleteSavedGraph: '1'
  //       }
  //     }
  //     await SavedGraphsController.createRequestForDeletingSavedGraph(mockRequest as Request, mockResponse as Response)
  //     expect(mockResponse.json).toBeCalledWith("Saved graph deletion was successful");
  //     expect(mockResponse.status).toBeCalledWith(200);
  //   });

  //   test('Invalid Delete Graph Request', async () => {
  //     mockRequest = {
  //       params: {
  //         deleteSavedGraph: "not a number"
  //       }
  //     }
  //     await SavedGraphsController.createRequestForDeletingSavedGraph(mockRequest as Request, mockResponse as Response)
  //     expect(mockResponse.json).toBeCalledWith("Invalid graph ID entered");
  //     expect(mockResponse.status).toBeCalledWith(400);
  //   });
})