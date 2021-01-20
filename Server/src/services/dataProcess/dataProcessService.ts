import { JsonFileFactory } from './JsonFileHandler';
import { IResponse } from '../../genericInterfaces/ResponsesInterface';
import { BadRequest, InternalServerError } from '@tsed/exceptions';


/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */
export class dataProcessService {

  private filePath: string
  private dataType: string
  private factory: any
  private outputData: any
  private command?: string
  private jsonBody?: any

  constructor(dataType: any, command: string, jsonBody: any = {}, filePath?: string) {
    this.dataType = dataType
    this.command = command
    this.filePath = filePath
    this.jsonBody = jsonBody
  }

  async extractData(): Promise<IResponse> {

    let requestResponse: IResponse = {} as any
    switch (this.dataType) {
      case 'json': {
        this.factory = new JsonFileFactory()
        this.outputData = await this.dataHandlerTemplate()
        //if(!this.outputData.status)
        break;
      }
      //TODO: Implement when building new file modules
      // case 'pdf:
      // return new PdfParser(filePathOfJson)
    }
    requestResponse.statusCode = 200;
    requestResponse.message = this.outputData;
    return requestResponse;
  }

  async dataHandlerTemplate(): Promise<IResponse> {
    let fileHandler: any
    if (this.command == 'Extract') {
      try {
        fileHandler = await this.factory.generateFileHandler(this.filePath)
        let parsedData = await fileHandler.parseFile()
        return parsedData
      } catch (error) {
        if (error instanceof BadRequest) {
          throw new BadRequest(error.message)
        }
      }
    }
    else if (this.command == 'Upload') {
      try {
        fileHandler = await this.factory.generateFileHandler()
        await fileHandler.validateExtractedData(this.jsonBody)
        let uploadResponse: any = await fileHandler.uploadData(this.jsonBody)
        return uploadResponse
      } catch (error) {
        if (error instanceof BadRequest) {
          throw new BadRequest(error.message)
        }
        else if (error instanceof InternalServerError) {
          throw new InternalServerError(error.message)
        }
      }
    }
  }
}