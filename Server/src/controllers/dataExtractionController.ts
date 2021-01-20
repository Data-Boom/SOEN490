import { Request, Response } from 'express';
import { dataProcessService } from '../services/dataExtract/dataProcessService'
import { FileUploadExtension } from '../genericInterfaces/DataProcessInterfaces';

/**
 * The fileUploadController is resposible for providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */

export class dataExtractionController {
  private filePathOfUpload: string;

  constructor(filePath: string) {
    this.filePathOfUpload = filePath;
  }

  createRequest(request: Request, response: Response /**nextFunction: NextFunction */) {
    //TODO: Custom validations here 
    if (!request.body) {
      response.status(400).send({
        message: "Nothing to process"
      });
    }
    else {
      try {
        let fileName: any = request.file.originalname as any;
        let extension = fileName.split('.').pop();
        this.callDataExtractorService(this.filePathOfUpload, extension, response);
      } catch (error) {
        console.error(error)
      }
    }
  };

  private async callDataExtractorService(filePath: string, extension: string, response: Response) {
    let commmand = 'extract'
    let dataService = new dataProcessService(filePath, extension, commmand);
    try {
      let extractDataResponse: any = await dataService.extractData();
      console.log(extractDataResponse)
      response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
    } catch (error) {
      console.log(error)
      response.status(error.status).json(error.message);
    };
  }

}