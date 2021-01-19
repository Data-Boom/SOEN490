import { IBaseParser } from './IDataExtractorService';
import { IDatasetModel } from '../../genericInterfaces/UploadInterfaces';
const fileSystem = require('fs');

export class JsonParser extends IBaseParser {

    protected async parseFile(filePath: string): Promise<IDatasetModel> {
        let jsonObj: IDatasetModel = await JSON.parse(fileSystem.readFileSync(filePath));
        return jsonObj
    }
}