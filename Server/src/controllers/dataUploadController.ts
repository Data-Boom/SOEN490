import { Request, Response } from 'express';
import { DataUploadService } from '../services/DataUploadService'
import { IDataSetModel } from '../genericInterfaces/DataProcessInterfaces';

/**
 * The dataUploadController is responsible for processing providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */

export class DataUploadController {
    private dataService: DataUploadService
    private dataSet: IDataSetModel

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
                this.dataSet = request.body
                this.dataService = new DataUploadService(this.dataSet)
                await this.dataService.validateExtractedData();
                let extractDataResponse: any = await this.dataService.uploadData();
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            }
        }
    }

    async createEditUploadRequest(request: Request, response: Response): Promise<Response> {
        if (!request.body || !request.params.datasetId) {
            response.status(400).json({
                message: "No Dataset Received"
            })
        }
        else {
            try {
                let datasetId = Number(request.params.datasetId)
                this.dataService = new DataUploadService(this.dataSet)
                await this.dataService.validateExtractedData();
                let extractDataResponse: any = await this.dataService.editDataset(datasetId);
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            }
        }
    }
}