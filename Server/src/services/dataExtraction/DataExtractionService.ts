import { JsonFileExtractorFactory } from './JsonFileHandlerFactory';
import { IResponse } from '../../genericInterfaces/ResponsesInterface';
import { BadRequest } from '@tsed/exceptions';
import { FileExtractorFactory } from './FileHandlerFactory';

/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */
export class DataExtractionService {

    private dataType: string
    private filePath: string
    private factory: FileExtractorFactory

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
        try {
            let parsedData = await fileHandler.parseFile()
            requestResponse.message = parsedData
            requestResponse.statusCode = 200;
            return requestResponse;
        }
        catch (error) {
            if (error instanceof BadRequest) {
                throw new BadRequest(error.message)
            }
            else {
                throw new Error(error.message)
            }
        }
    }
}