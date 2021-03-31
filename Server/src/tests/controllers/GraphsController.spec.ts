import { Request, Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { GraphsController } from '../../controllers/GraphsController';
import { validGraphStateData1, validGraphStateData2 } from '../testData/testData';

describe('Graphs State Controller ', () => {
  let mockRequest;
  let mockResponse;
  let SavedGraphsController: GraphsController;

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
    SavedGraphsController = new GraphsController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    }
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Valid GraphID Request', async () => {
    let expectedResponse = validGraphStateData1[0]
    mockRequest = {
      params: {
        graphStateId: '1'
      }
    }
    await getSingleGraphWithAssert(mockRequest as Request, mockResponse as Response, 200, expectedResponse)
  });

  test('Invalid GraphID Request', async () => {
    mockRequest = {
      params: {
        graphStateId: 'werwer'
      }

    }
    await getSingleGraphWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid graph ID entered")
  });

  test('Non-existant GraphID Request', async () => {
    mockRequest = {
      params: {
        graphStateId: '-1'
      }
    }
    await getSingleGraphWithAssert(mockRequest as Request, mockResponse as Response, 400, "Graph does not exist")
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
    await getSavedGraphsWithAssert(mockRequest as Request, mockResponse as Response, expectedResponse)
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
    await getSavedGraphsWithAssert(mockRequest as Request, mockResponse as Response, expectedResponse)
  });

  test('Valid User Saved Graphs Request; user has no graphs', async () => {
    let expectedResponse = []
    mockRequest = {
      body: {
        user: {
          account_id: '3'
        }
      }
    }
    await getSavedGraphsWithAssert(mockRequest as Request, mockResponse as Response, expectedResponse)
  });

  test('Valid Graph Insert Request', async () => {
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
            "units": "cm"
          },
          {
            "variableName": "temp",
            "mode": "big",
            "zoom": 100,
            "units": "C"
          }
        ],
        user: {
          account_id: '1'
        }
      }
    }
    await SavedGraphsController.createRequestForAddingGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expect.any(Number));
    expect(mockResponse.status).toBeCalledWith(201);
  });

  test('Valid Graph Update Request', async () => {
    let expectedResponse = "Graph successfully updated"
    mockRequest = {
      body: {
        "datasets": [
          {
            "id": 1,
            "color": "red",
            "shape": "square",
            "isHidden": false
          }
        ],
        "name": "Altering First Graph",
        "axes": [
          {
            "variableName": "temperature",
            "logarithmic": true,
            "zoomEndIndex": 100,
            "zoomStartIndex": 100,
            "units": "C"
          }
        ],
        "id": 1,
        user: {
          account_id: '1'
        }
      }
    }
    await updateGraphWithAssert(mockRequest as Request, mockResponse as Response, 200, expectedResponse)
  });

  test('Invalid Graph Update Request; user did not create this graph', async () => {
    let expectedResponse = "This is not your graph!"
    mockRequest = {
      body: {
        "id": 2,
        user: {
          account_id: '1'
        }
      }
    }
    await updateGraphWithAssert(mockRequest as Request, mockResponse as Response, 400, expectedResponse)
  });

  //Do these deletion tests last
  test('Delete Graph Request', async () => {
    mockRequest = {
      params: {
        graphStateId: '1'
      },
      body: {
        user: {
          account_id: '1'
        }
      }
    }
    await deleteGraphWithAssert(mockRequest as Request, mockResponse as Response, 200, "Graph successfully deleted")
  });

  test('Delete Graph Request; created by different user', async () => {
    mockRequest = {
      params: {
        graphStateId: '2'
      },
      body: {
        user: {
          account_id: '1'
        }
      }
    }
    await deleteGraphWithAssert(mockRequest as Request, mockResponse as Response, 400, "This is not your graph!")
  });

  test('Delete Non-existant Graph Request; graph state does not exist', async () => {
    mockRequest = {
      params: {
        graphStateId: '-1'
      },
      body: {
        user: {
          account_id: '1'
        }
      }
    }
    await deleteGraphWithAssert(mockRequest as Request, mockResponse as Response, 400, "Graph does not exist")
  });

  test('Invalid Delete Graph Request; graph state ID is NaN', async () => {
    mockRequest = {
      params: {
        graphStateId: 'werewrwerwre'
      },
      body: {
        user: {
          account_id: '1'
        }
      }
    }
    await deleteGraphWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid graph ID entered")
  });

  async function getSingleGraphWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
    await SavedGraphsController.createRequestForSingleGraph(mockRequest, mockResponse)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(status);
  }
  async function getSavedGraphsWithAssert(mockRequest: Request, mockResponse: Response, expectedResponse: any) {
    await SavedGraphsController.createRequestForUserSavedGraphs(mockRequest, mockResponse)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
  }

  async function updateGraphWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
    await SavedGraphsController.createRequestForUpdatingGraph(mockRequest, mockResponse)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(status);
  }

  async function deleteGraphWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
    await SavedGraphsController.createRequestForDeletingGraph(mockRequest, mockResponse)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(status);
  }
})

