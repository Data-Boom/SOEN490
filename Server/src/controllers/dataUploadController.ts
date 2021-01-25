import { Request, Response } from 'express';
import { DataUploadService } from '../services/dataUpload/DataUploadService'

/**
 * The dataUploadController is responsible for processing providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */

export class DataUploadController {
    private dataService: DataUploadService

    constructor() {
    }

    async createRequest(request: Request, response: Response): Promise<Response> {
        if (!request.body) {
            response.status(400).json({
                message: "No Data to Upload"
            })
        }
        else {
            try {
                await this.dataService.validateExtractedData();
                let extractDataResponse: any = await this.dataService.uploadData();
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            }
        }
    }

    async createEditedUploadRequest(request: Request, response: Response): Promise<Response> {
        let datasetId = Number(request.params.datasetId)
        if (!request.body || !datasetId) {
            response.status(400).json({
                message: "No Dataset Received"
            })
        }
        else {
            try {
                await this.dataService.validateExtractedData();
                let extractDataResponse: any = await this.dataService.editedUploadedDataset(datasetId);
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            }
        }
    }
}