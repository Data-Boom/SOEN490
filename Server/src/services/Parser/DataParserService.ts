import { JsonFileExtractorFactory } from './JsonFileHandlerFactory';
import { IResponse } from '../../genericInterfaces/ResponsesInterface';
import { BadRequest } from '@tsed/exceptions';
import { FileExtractorFactory } from './FileHandlerFactory';
import { CSVFileExtractorFactory } from './CSVFileHandlerFactory';

/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */
export class DataParserService {

    private dataType: string
    private filePath: string
    private factory: FileExtractorFactory

    constructor(dataType: any, filePath: string) {
        this.dataType = dataType
        this.filePath = filePath
    }

    async parseData(): Promise<IResponse> {

        let requestResponse: IResponse = {} as any
        switch (this.dataType) {
            case 'json': {
                this.factory = new JsonFileExtractorFactory()
                break
            }
            //TODO: Implement when building new file modules
            case 'pdf':
            //this.factory = new PDFFileExtractorFactory()
            case 'csv':
            case 'txt': {
                this.factory = new CSVFileExtractorFactory();
                break
            }
        }
        let fileHandler: any = await this.factory.getFileHandler(this.filePath)
        try {
            let parsedData = await fileHandler.parseFile()
            requestResponse.message = parsedData
            requestResponse.statusCode = 200;
        }
        catch (error) {
            if (error instanceof BadRequest) {
                throw new BadRequest(error.message)
            }
            else {
                throw new Error(error.message)
            }
        } finally {
            await fileHandler.deleteFile()
            return requestResponse;
        }
    }
}