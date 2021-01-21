import { JsonFileHandlerFactory } from './JsonFileHandlerFactory';
import { IResponse } from '../../genericInterfaces/ResponsesInterface';

/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */
export class DataProcessService {

    private dataType: string
    private filePath: string
    private factory: any
    private outputData: any
    private command: string
    private jsonBody: JSON

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
                this.factory = new JsonFileHandlerFactory()
                this.outputData = await this.dataHandlerTemplate()
                break;
            }
            //TODO: Implement when building new file modules
            // case 'pdf:
            // this.factory = new PdfFileFactory()
            // this.outputData = await this.dataHandlerTemplate()
            // break;
        }
        requestResponse.statusCode = 200;
        requestResponse.message = this.outputData;
        return requestResponse;
    }

    async dataHandlerTemplate(): Promise<IResponse> {
        let fileHandler: any
        fileHandler = await this.factory.getFileHandler(this.filePath)
        if (this.command == 'Extract') {
            let parsedData = await fileHandler.parseFile()
            return parsedData
        }
        if (this.command == 'Upload') {
            await fileHandler.validateExtractedData(this.jsonBody)
            let uploadResponse: any = await fileHandler.uploadData(this.jsonBody)
            return uploadResponse
        }

    }
}