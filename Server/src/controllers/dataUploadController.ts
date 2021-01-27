import { Request, Response } from 'express';
import { UnapprovedUploadService } from '../services/DataUpload/UnapprovedUploadService'
import { IDataSetModel } from '../genericInterfaces/DataProcessInterfaces';
import EditUploadService from '../services/DataUpload/EditUploadService';

/**
 * The dataUploadController is responsible for processing providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */

export class DataUploadController {
    private dataService: any
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
                this.dataService = new UnapprovedUploadService(this.dataSet)
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
                this.dataSet = request.body
                let datasetId = Number(request.params.datasetId)
                this.dataService = new EditUploadService(this.dataSet, datasetId)
                await this.dataService.validateExtractedData();
                let extractDataResponse: any = await this.dataService.uploadData();
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            }
        }
    }
}