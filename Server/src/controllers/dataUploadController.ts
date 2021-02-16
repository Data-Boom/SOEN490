import { Request, Response } from 'express';

import AbstractUploadService from '../services/DataUpload/AbstractUploadService';
import EditUploadService from '../services/DataUpload/EditUploadService';
import { IDataSetModel } from '../genericInterfaces/DataProcessInterfaces';
import { UnapprovedUploadService } from '../services/DataUpload/UnapprovedUploadService'
import { EditUploadVerificationService } from '../services/DataUpload/EditUploadVerificationService';

/**
 * The dataUploadController is responsible for processing providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */

export class DataUploadController {
    private dataService: AbstractUploadService
    private dataSet: IDataSetModel

    constructor() {
    }

    async createNewDatasetRequest(request: Request, response: Response): Promise<Response> {
        if (!request.body.hasOwnProperty('reference') || !request.body.hasOwnProperty('dataset_name')
            || !request.body.hasOwnProperty('material') || !request.body.hasOwnProperty('category')
            || !request.body.hasOwnProperty('data')) {
            response.status(400).json("No Data to Upload")
        }
        else {
            try {
                let userId: any = request.body.user.account_id
                this.dataSet = request.body
                this.dataService = new UnapprovedUploadService(this.dataSet, null, userId, null)
                await this.dataService.validateExtractedData();
                let extractDataResponse: any = await this.dataService.uploadData();
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            }
        }
    }

    async createEditUploadRequest(request: Request, response: Response): Promise<Response> {
        let requestParam = request.params.datasetId;
        let datasetId = Number(requestParam);
        if (isNaN(datasetId)) {
            response.status(400).json("Invalid data set ID entered");
        }
        else if (!request.body.hasOwnProperty('reference') || !request.body.hasOwnProperty('dataset_name')
            || !request.body.hasOwnProperty('material') || !request.body.hasOwnProperty('category')
            || !request.body.hasOwnProperty('data')) {
            response.status(400).json("No Dataset Received")
        }
        else {
            try {
                this.dataSet = request.body
                let userId: number = request.body.user.account_id
                let permissionLevel: number = request.body.user.account_admin
                let uploadVerificationService = new EditUploadVerificationService()
                let clearFlag = await uploadVerificationService.verifyUploader(userId, permissionLevel, datasetId);
                this.dataService = new EditUploadService(this.dataSet, datasetId, null, clearFlag)
                await this.dataService.validateExtractedData();
                let extractDataResponse: any = await this.dataService.uploadData();
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            }
        }
    }
}