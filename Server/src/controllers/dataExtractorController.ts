import { Request, Response } from 'express';
import { dataExtractorService } from '../services/dataExtract/dataExtractorService'
import { FileUploadExtension } from '../genericInterfaces/UploadInterfaces';

/**
 * The fileUploadController is resposible for providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the file.
 */


export class fileUploadController {
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
        let fileName = request.file.originalname;
        let extension = fileName.split('.').pop();
        this.callFileUploadService(this.filePathOfUpload, extension, response);
        // let type: FileUploadExtension
        // switch (extension) {
        //   case 'json':
        //     type = FileUploadExtension.json
        //     this.callFileUploadService(this.filePathOfUpload, type, response);
        //     break;
        //   case 'pdf':
        //     type = FileUploadExtension.pdf
        //     this.callFileUploadService(this.filePathOfUpload, type, response);
        //     break;
        //   case 'png':
        //     type = FileUploadExtension.png
        //     this.callFileUploadService(this.filePathOfUpload, type, response);
        //     break;
        //}
      } catch (error) {
        console.error(error)
      }
    }
  };

  private async callFileUploadService(filePath: string, extension: string, response: Response) {
    let fileService = new fileUploadService(filePath, extension);
    try {
      let fileServiceResponse = await fileService.processUpload();
      response.status(200).json(fileServiceResponse);
    } catch (error) {
      response.status(error.status).json(error.message);
    };
  }

}