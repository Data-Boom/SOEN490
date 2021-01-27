import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { DataSetController } from '../../controllers/DataSetController';

describe('SavedGraphs Controller ', () => {
    let mockRequest;
    let mockResponse;
    let GetDataControllerController: DataSetController;

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        GetDataControllerController = new DataSetController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Valid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                datasetId: '1'
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Favorite data set successfully saved");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Save Data Set Request, Data Set Already Saved', async () => {
        mockRequest = {
            params: {
                userEmail: 'j.comkj',
                datasetId: '2'
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Favorite data set is already saved");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'fake@email.com',
                datasetId: '1'
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid user email provided");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'j.comkj',
                datasetId: "wrtrterterte"
            }
        }
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    // Do these tests last
    test('Valid Remove Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'j.comkj',
                datasetId: '1'
            }
        }
        await GetDataControllerController.createRequestToDeleteSavedDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User favorite successfully removed");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Remove Non-existant Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'j.comkj',
                datasetId: '1'
            }
        }
        await GetDataControllerController.createRequestToDeleteSavedDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("User favorite successfully removed");
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Invalid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'fake@email.com',
                datasetId: '1'
            }
        }
        await GetDataControllerController.createRequestToDeleteSavedDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid user email provided");
        expect(mockResponse.status).toBeCalledWith(400);
    });

    test('Invalid Save Data Set Request', async () => {
        mockRequest = {
            params: {
                userEmail: 'j.comkj',
                datasetId: "wrtrterterte"
            }
        }
        await GetDataControllerController.createRequestToDeleteSavedDataSet(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith("Invalid data set ID entered");
        expect(mockResponse.status).toBeCalledWith(400);
    });
})