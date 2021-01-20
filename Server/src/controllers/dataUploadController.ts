import { Request, Response } from 'express';
import { DataProcessService } from '../services/dataProcess/dataProcessService'

/**
 * The dataUploadController is responsible for processing providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */

export class DataUploadController {
    private dataService: DataProcessService

    constructor() {
    }

    async createRequest(request: Request, response: Response): Promise<Response> {
        if (!request.body) {
            response.status(400).send({
                message: "No Json to Upload Received"
            });
        }
        else {
            let command = 'Upload'
            let dataType = 'json'
            this.dataService = new DataProcessService(dataType, command, request.body);
            try {
                let extractDataResponse: any = await this.dataService.extractData();
                return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
            } catch (error) {
                return response.status(error.status).json(error.message);
            };
        }
    };
}