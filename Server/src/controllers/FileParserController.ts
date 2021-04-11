import { Response } from 'express';
import { MulterRequest } from '../genericInterfaces/FileParserInterfaces';
import { DataParserService } from '../services/Parser/DataParserService'

/**
 * The FileParserController is responsible for preparing a request and extracting key information
 * from the request. The controller also finds the extension of the input file as processing is done based on it
 */

export class FileParserController {
  private filePathOfUpload: string;
  private fileName: string
  private fileExtension: string

  constructor() {
  }

  createRequest(request: MulterRequest, response: Response) {
    if (!request.file) {
      response.status(400).json("No file was given.");
    }
    else {
      this.filePathOfUpload = request.file.path
      this.fileName = request.file.originalname
      this.fileExtension = this.fileName.split('.').pop();
      let requestResponse: any = this.callDataParserService(this.filePathOfUpload, this.fileExtension, response);
      return requestResponse
    }
  }


  private async callDataParserService(filePath: string, extension: string, response: Response): Promise<Response> {

    let dataService = new DataParserService(extension, filePath);
    try {
      let extractDataResponse: any = await dataService.parseData();
      return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }

}