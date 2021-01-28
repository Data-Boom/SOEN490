import { DataUploadController } from '../../controllers/dataUploadController';
import { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { validTestData, inValidTestData } from '../testData/testData';

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
        await dataUploadController.createRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(201)
    })

    test('Invalid Json Upload', async () => {

        let expectedResponse = "Type is a required field"
        mockRequest = {
            body: inValidTestData
        }
        await dataUploadController.createRequest(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(400)
    })
})