import { JsonFileFactory } from './JsonFileHandler';
import { IResponse } from '../../genericInterfaces/ResponsesInterface';


/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */
export class dataProcessService {

  protected filePath: string
  protected fileType: string
  protected factory: any
  protected command: string

  constructor(filePath: string, fileType: any, command: string) {
    this.filePath = filePath
    this.fileType = fileType
    this.command = command
  }

  async extractData(): Promise<IResponse> {

    let requestResponse: IResponse
    let temp: any
    switch (this.fileType) {
      case 'json': {
        try {

          this.factory = new JsonFileFactory()
          temp = await this.dataHandlerTemplate()
          console.log(temp)
          break;
        } catch (err) {
          console.log(err)
        }
      }
      //TODO: Implement when building new file modules
      // case 'pdf:
      // return new PdfParser(filePathOfJson)
    }
    requestResponse.statusCode = 200;
    requestResponse.message = temp;
    return requestResponse;
  }

  async dataHandlerTemplate(): Promise<IResponse> {

    let requestResponse: IResponse
    let fileHandler = await this.factory.generateFileHandler(this.filePath)
    let parsedData = await fileHandler.parseFile()
    if (this.command == 'upload') {
      await fileHandler.validateExtractedData()
      let uploadResponse: any = await fileHandler.uploadData()
      return uploadResponse
    }
    requestResponse.statusCode = 200;
    requestResponse.message = parsedData
  }
}