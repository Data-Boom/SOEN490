import { AbstractFileHandler, FileHandlerFactory } from './FileHandlerFactory';
import { BadRequest } from '@tsed/exceptions';
import { IJsonDatasetModel } from '../../genericInterfaces/DataProcessInterfaces'
const fileSystem = require('fs');


export class JsonFileExtractorFactory extends FileExtractorFactory {

    getFileHandler(filePath: string): AbstractFileExtractor {
        return new JsonFileExtractor(filePath)
    }
}

export class JsonFileExtractor extends AbstractFileExtractor {

    async parseFile(): Promise<IDatasetModel> {
        try {
            this.parsedFileData = await JSON.parse(fileSystem.readFileSync(this.filePath))
            return this.parsedFileData
        } catch (err) {
            throw new BadRequest("Cannot parse your file. Something is wrong with it");
        }
    }
}