import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { inValidTestData, validTestData } from '../testData/testData';

import { DataUploadController } from '../../controllers/dataUploadController';

describe('Data Upload Controller', () => {
    let mockRequest
    let mockResponse
    let dataUploadController: DataUploadController

    beforeEach(async () => {
        await createConnection();
        jest.setTimeout(60000)
        dataUploadController = new DataUploadController()
        mockRequest = {}
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }

    })
    afterEach(async () => {
        await getConnection().close();
    });

    test('Valid Json Upload', async () => {

        let expectedResponse = "Upload to Database was successful!"
        mockRequest = {
            body: validTestData
        }
        await dataUploadController.createNewDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.status).toBeCalledWith(201)
    })

    test('Invalid Json Upload', async () => {

        let expectedResponse = "Type is a required field"
        mockRequest = {
            body: inValidTestData
        }
        await dataUploadController.createNewDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(400)
    })

    test('Invalid Upload', async () => {

        let expectedResponse = "No Data to Upload"
        mockRequest = {
            body: {
                user: {
                    account_id: 1
                }
            }
        }
        await dataUploadController.createNewDatasetRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(400)
    })

    test('Valid User Data Set Edit', async () => {

        let expectedResponse = "Dataset Updated!"
        mockRequest = {
            body: validTestData,
            params: {
                datasetId: '9'
            }
        }
        await dataUploadController.createEditUploadRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(201)
    })

    test('Invalid User Data Set Edit; bad data set id', async () => {

        let expectedResponse = "Invalid data set ID entered"
        mockRequest = {
            body: validTestData,
            params: {
                datasetId: 'wefwfeewfewfwefwef'
            }
        }
        await dataUploadController.createEditUploadRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(400)
    })

    test('Invalid User Data Set Edit; different uploader ID', async () => {

        let expectedResponse = "User ID does not match uploader ID!"
        mockRequest = {
            body: validTestData,
            params: {
                datasetId: '15'
            }
        }
        await dataUploadController.createEditUploadRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(400)
    })

    test('Invalid Data Set Edit; empty body', async () => {

        let expectedResponse = "No Dataset Received"
        mockRequest = {
            body: {},
            params: {
                datasetId: '0'
            }
        }
        await dataUploadController.createEditUploadRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(400)
    })
})