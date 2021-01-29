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

  test('Valid User Saved Graphs Request; user has no graphs', async () => {
    let expectedResponse = "You don't have any saved graphs!"
    mockRequest = {
      body: {
        user: {
          account_id: '3'
        }
      }
    }
    await SavedGraphsController.createRequestForUserSavedGraphs(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
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
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
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
    await SavedGraphsController.createRequestForUpdatingGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(200);
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
    await SavedGraphsController.createRequestForDeletingGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Graph successfully deleted");
    expect(mockResponse.status).toBeCalledWith(200);
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
    await SavedGraphsController.createRequestForDeletingGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("This is not your graph!");
    expect(mockResponse.status).toBeCalledWith(400);
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
    await SavedGraphsController.createRequestForDeletingGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Graph does not exist");
    expect(mockResponse.status).toBeCalledWith(400);
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
    await SavedGraphsController.createRequestForDeletingGraph(mockRequest as Request, mockResponse as Response)
    expect(mockResponse.json).toBeCalledWith("Invalid graph ID entered");
    expect(mockResponse.status).toBeCalledWith(400);
  });
})