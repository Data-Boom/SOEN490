import { Request, Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { FileParserController } from '../../controllers/FileParserController';
import { MulterRequest } from '../../genericInterfaces/FileParserInterfaces';

describe('Category Controller', () => {
    let mockRequest;
    let mockResponse;
    let controller: FileParserController;

    // Needs to be done for each test instead of all, or else files can be 'retained' between tests
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
        controller = new FileParserController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Valid - Request to Extract to Extract a CSV file', async () => {
        let filePath = 'src/tests/testData/csv_data_upload_sample2.csv'
        let fileName = 'csv_data_upload_sample2.csv'
        mockRequest = {
            file: { "path": filePath, "originalname": fileName }
        }
        await uploadFileWithStatusCheck(controller, mockRequest as MulterRequest, mockResponse as Response, 200)
    });

    test('Valid - Request to Extract to Extract a JSON file', async () => {
        let filePath = 'src/tests/testData/validJSON.json'
        let fileName = 'validJSON.json'
        mockRequest = {
            file: { "path": filePath, "originalname": fileName }
        }
        await uploadFileWithStatusCheck(controller, mockRequest as MulterRequest, mockResponse as Response, 200)
    });

    test('Invalid - Request to Extract a non-existing file', async () => {
        let expectedResponse = "Cannot parse your file. Something is wrong with it"
        let filePath = 'src/tests/testData/brokenJSON.json'
        let fileName = 'brokenJSON.json'
        mockRequest = {
            file: { "path": filePath, "originalname": fileName }
        }
        await uploadFileWithAssert(controller, mockRequest as MulterRequest, mockResponse as Response, 400, expectedResponse)
    });

    test('Invalid - Empty Body', async () => {
        let expectedResponse = "No file was given."
        await uploadFileWithAssert(controller, mockRequest as MulterRequest, mockResponse as Response, 400, expectedResponse)
    });

    async function uploadFileWithAssert(controller: FileParserController, mockRequest: MulterRequest, mockResponse: Response, status: number, expectedResponse: any) {
        await controller.createRequest(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function uploadFileWithStatusCheck(controller: FileParserController, mockRequest: MulterRequest, mockResponse: Response, status: number) {
        await controller.createRequest(mockRequest, mockResponse)
        expect(mockResponse.status).toBeCalledWith(status);
    }

})