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

    constructor(dataType: any, filePath: string) {
        this.dataType = dataType
        this.filePath = filePath
    }

    async extractData(): Promise<IResponse> {

        let requestResponse: IResponse = {} as any
        switch (this.dataType) {
            case 'json': {
                this.factory = new JsonFileExtractorFactory()
            }
            //TODO: Implement when building new file modules
            case 'pdf':
            //this.factory = new PDFFileExtractorFactory()
        }
        let fileHandler: any = await this.factory.getFileHandler(this.filePath)
        let parsedData = await fileHandler.parseFile()
        requestResponse.message = parsedData
        requestResponse.statusCode = 200;
        return requestResponse;
    }
}