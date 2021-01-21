import { JsonFileExtractorFactory } from './JsonFileHandlerFactory';
import { IResponse } from '../../genericInterfaces/ResponsesInterface';

/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */
export class DataExtractionService {

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
                this.factory = new JsonFileExtractorFactory()
                let fileHandler: any = await this.factory.getFileHandler(this.filePath)
                let parsedData = await fileHandler.parseFile()
                requestResponse.message = parsedData
            }
            //TODO: Implement when building new file modules
            case 'pdf':
                this.factory = new PDFFileExtractorFactory()
                let fileHandler: any = await this.factory.getFileHandler(this.filePath)
                let parsedData = await fileHandler.parseFile()
                requestResponse.message = parsedData
        }
        requestResponse.statusCode = 200;
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