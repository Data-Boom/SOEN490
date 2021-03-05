import { AbstractFileExtractor, FileExtractorFactory } from './FileHandlerFactory';

import { BadRequest } from '@tsed/exceptions';
import { IDataSetModel } from '../../genericInterfaces/DataProcessInterfaces'
import { CategoryModel } from '../../models/CategoryModel';

const fileSystem = require('fs');


export class JsonFileExtractorFactory extends FileExtractorFactory {

    getFileHandler(filePath: string): AbstractFileExtractor {
        return new JsonFileExtractor(filePath)
    }
}

export class JsonFileExtractor extends AbstractFileExtractor {
    private categoryModel: CategoryModel

    constructor(filePath: string) {
        super(filePath);
        this.categoryModel = new CategoryModel()
    }
    async parseFile(): Promise<Partial<IDataSetModel>> {
        try {
            let parsedFileData: Partial<IDataSetModel> = JSON.parse(fileSystem.readFileSync(this.filePath))
            let categoryID = await this.categoryModel.findCategoryIDFromSubcategoryID(parsedFileData.subcategory)
            if (!categoryID) {
                parsedFileData.category = null
                parsedFileData.subcategory = null
            }
            else {
                parsedFileData.category = categoryID.id
            }
            return parsedFileData
        } catch (err) {
            throw new BadRequest("Cannot parse your file. Something is wrong with it");
        }
    }
}