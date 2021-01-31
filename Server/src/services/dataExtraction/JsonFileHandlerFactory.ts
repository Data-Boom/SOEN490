import { AbstractFileExtractor, FileExtractorFactory } from './FileHandlerFactory';

import { BadRequest } from '@tsed/exceptions';
import { IDataSetModel } from '../../genericInterfaces/DataProcessInterfaces'

const fileSystem = require('fs');


export class JsonFileExtractorFactory extends FileExtractorFactory {

    getFileHandler(filePath: string): AbstractFileExtractor {
        return new JsonFileExtractor(filePath)
    }
}

export class JsonFileExtractor extends AbstractFileExtractor {

    parseFile(): Partial<IDataSetModel> {
        try {

            let parsedFileData: Partial<IDataSetModel> = JSON.parse(fileSystem.readFileSync(this.filePath))
            return parsedFileData
        } catch (err) {
            throw new BadRequest("Cannot parse your file. Something is wrong with it");
        }
    }
}