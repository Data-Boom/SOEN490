import { Request, Response } from 'express';
import { dataProcessService } from '../services/dataProcess/dataProcessService'
import { FileUploadExtension } from '../genericInterfaces/DataProcessInterfaces';

/**
 * The fileUploadController is resposible for providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */

export class dataUploadController {

    constructor() {
    }

    createRequest(request: Request, response: Response) {
        //TODO: Custom validations here 
        if (!request.body) {
            response.status(400).send({
                message: "No Json Body Received"
            });
        }
        else {
            this.callDataProcessService(request.body, response);
        }
    };

    private async callDataProcessService(jsonData: any, response: Response) {
        let command = 'Upload'
        let dataService = new dataProcessService(jsonData, command);
        try {
            let extractDataResponse: any = await dataService.extractData();
            response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
        } catch (error) {
            console.log(error)
            response.status(error.status).json(error.message);
        };
    }

}