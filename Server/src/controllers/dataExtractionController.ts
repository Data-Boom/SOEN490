import { Request, Response } from 'express';
import { DataExtractionService } from '../services/dataProcess/DataExtractionService'

/**
 * The dataExtractionController is responsible for preparing a request and extracting key information
 * from the request. The controller also finds the extension of the input file as processing is done based on it
 */

export class dataExtractionController {
  private filePathOfUpload: string;
  private fileName: string
  private fileExtension: string

  constructor(filePath: string, fileName: string) {
    this.filePathOfUpload = filePath;
    this.fileName = fileName
    this.fileExtension = this.fileName.split('.').pop();
  }

  createRequest(request: Request, response: Response) {
    if (!request.body) {
      response.status(400).json("Request Body is empty.");
    }
    else {
      let requestResponse: any = this.callDataExtractionService(this.filePathOfUpload, this.fileExtension, response);
      return requestResponse
    }
  };


  private async callDataExtractionService(filePath: string, extension: string, response: Response): Promise<Response> {
    let command = 'Extract'
    let dataService = new DataExtractionService(extension, command, null, filePath);
    try {
      let extractDataResponse: any = await dataService.extractData();
      return response.status(extractDataResponse.statusCode).json(extractDataResponse.message);
    } catch (error) {
      return response.status(error.status).json(error.message);
    };
  }

}