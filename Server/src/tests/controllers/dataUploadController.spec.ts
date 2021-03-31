import { Request, Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { inValidTestData, validTestData } from '../testData/testData';

import { DataUploadController } from '../../controllers/dataUploadController';

describe('Data Upload Controller', () => {
    let mockRequest
    let mockResponse
    let dataUploadController: DataUploadController

    beforeEach(async () => {
        try {
            await createConnection();
        } catch (error) {
            // If AlreadyHasActiveConnectionError occurs, return already existent connection
            if (error.name === "AlreadyHasActiveConnectionError") {
                return getConnectionManager().get();
            }
        }
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

        mockRequest = {
            body: validTestData
        }
        await newUpload(mockRequest as Request, mockResponse as Response, 201)
    })

    test('Invalid Json Upload', async () => {

        let expectedResponse = "Type is a required field"
        mockRequest = {
            body: inValidTestData
        }
        await newUpload(mockRequest as Request, mockResponse as Response, 400)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
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
        await newUpload(mockRequest as Request, mockResponse as Response, 400)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
    })

    test('Valid User Data Set Edit', async () => {

        let expectedResponse = "Dataset Updated!"
        mockRequest = {
            body: validTestData,
            params: {
                datasetId: '9'
            }
        }
        await editUpload(mockRequest as Request, mockResponse as Response, 201, expectedResponse)
    })

    test('Invalid User Data Set Edit; bad data set id', async () => {

        let expectedResponse = "Invalid data set ID entered"
        mockRequest = {
            body: validTestData,
            params: {
                datasetId: 'wefwfeewfewfwefwef'
            }
        }
        await editUpload(mockRequest as Request, mockResponse as Response, 400, expectedResponse)
    })

    test('Invalid User Data Set Edit; different uploader ID', async () => {

        let expectedResponse = "User ID does not match uploader ID!"
        mockRequest = {
            body: validTestData,
            params: {
                datasetId: '15'
            }
        }
        await editUpload(mockRequest as Request, mockResponse as Response, 400, expectedResponse)
    })

    test('Invalid Data Set Edit; empty body', async () => {

        let expectedResponse = "No Dataset Received"
        mockRequest = {
            body: {},
            params: {
                datasetId: '0'
            }
        }
        await editUpload(mockRequest as Request, mockResponse as Response, 400, expectedResponse)
    })

    async function newUpload(mockRequest: Request, mockResponse: Response, status: number) {
        await dataUploadController.createNewDatasetRequest(mockRequest, mockResponse)
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function editUpload(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await dataUploadController.createEditUploadRequest(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }
})