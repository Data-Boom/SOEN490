import { FileUploadExtension, IDatasetModel } from '../../genericInterfaces/UploadInterfaces'
import { validationSchema } from './validationSchema';
import { BadRequest } from '@tsed/exceptions';
import { JsonParser } from './JsonParser';

export abstract class IBaseParser {
    filePath: string

    constructor(filePath: string) {
        this.filePath = filePath;
        this.parseFile(this.filePath);
    }
    protected abstract parseFile(filePath: string);
}

export abstract class IDataExtractorService {
    protected filePath: string
    protected type: FileUploadExtension
    protected jsonData: any

    constructor(filePath: string, type: FileUploadExtension) {
        this.filePath = filePath
        this.type = type
    }

    protected async dataExtractorTemplate(): Promise<any> {
        await this.buildParser(this.filePath);
        if (FileUploadExtension.json) {
            this.validateJsonData()
            return this.jsonData
        }
        await this.extractDataFromFile();
        return this.jsonData;
    }

    protected buildParser(filePathOfJson: string) {
        if (FileUploadExtension.json) {
            return new JsonParser(filePathOfJson)
        }
        //TODO: Implement when building new modules
        else if (FileUploadExtension.png) {
            //return new PdfParser(filePathOfJson)
        }
        else if (FileUploadExtension.pdf) {
            //return new PngParser(filePathOfJson)
        }
    }

    protected async validateJsonData() {
        try {
            await validationSchema.validate(this.jsonData)
        }
        catch (err) {
            throw new BadRequest(err.message);
        }
    }
    protected abstract extractDataFromFile()
}