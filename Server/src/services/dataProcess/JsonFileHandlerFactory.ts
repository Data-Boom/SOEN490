import { AbstractFileHandler, FileHandlerFactory } from './FileHandlerFactory';
import { DataUploadModel } from '../../models/DataUploadModel'
import { Authors } from '../../models/entities/Authors';
import { BadRequest } from '@tsed/exceptions';
import { validationSchema } from '../helpers/validationSchema';
import { IJsonDatasetModel } from '../../genericInterfaces/DataProcessInterfaces'
const fileSystem = require('fs');


export class JsonFileHandlerFactory extends FileHandlerFactory {

    getFileHandler(filePath: string): AbstractFileHandler {
        return new JsonFileHandler(filePath)
    }
}

export class JsonFileHandler extends AbstractFileHandler {

    async parseFile(): Promise<IJsonDatasetModel> {
        try {
            this.parsedFileData = await JSON.parse(fileSystem.readFileSync(this.filePath))
            return this.parsedFileData
        } catch (err) {
            throw new BadRequest("Cannot parse your file. Something is wrong with it");
        }
    }

    async validateExtractedData(jsonData: any): Promise<JSON> {
        try {
            await validationSchema.validate(jsonData)
            return jsonData;
        } catch (err) {
            throw new BadRequest(err.message);
        }
    }

    async uploadData(jsonData: any): Promise<string> {

        let individualDataSetComments: string[] = [];
        let referenceType: string = '';

        let referenceDatePublished: Date = null;
        let referenceDateAccessed: Date = null;

        this.parsedFileData = jsonData

        // Create this object after the parsing passes
        let uploadModel = new DataUploadModel();

        let referenceTypeID: number = await this.insertReferenceType(uploadModel, referenceType)

        let publisherNameId: number = await this.insertPublisher(uploadModel, this.parsedFileData.reference.publisher)

        let allAuthors: Authors[] = await this.insertAuthors(uploadModel, this.parsedFileData.reference.authors)

        let referenceTitle: string = this.parsedFileData.reference.title;
        let referenceDOI: string = this.parsedFileData.reference.doi;
        let referencePages: number = this.parsedFileData.reference.pages;
        let referenceYear: number = this.parsedFileData.reference.year;
        let referenceVolume: number = this.parsedFileData.reference.volume;

        if (this.parsedFileData.reference.datePublished !== undefined)
            referenceDatePublished = this.parsedFileData.reference.datePublished;
        if (this.parsedFileData.reference.dateAccessed !== undefined)
            referenceDateAccessed = this.parsedFileData.reference.dateAccessed;

        let publicationID: number = await this.insertPublication(uploadModel, referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors)

        let allMaterials: any[] = await this.insertMaterials(uploadModel, this.parsedFileData.material)

        let categoryIDs: number[] = await uploadModel.insertCategories(this.parsedFileData.category, this.parsedFileData.subcategory);

        let dataSetDataTypeID: number = await this.insertDataSetDataType(uploadModel, this.parsedFileData["data type"])

        let dataSetID: number = await this.insertFullDataSet(uploadModel, this.parsedFileData["dataset name"], dataSetDataTypeID, publicationID, categoryIDs, allMaterials, this.parsedFileData.data.comments)

        //run check on variable vs contents length to see if they're equal
        if (this.parsedFileData.data.variables.length == this.parsedFileData.data.contents[0].point.length) {
            console.log("variable and content lengths are equal....proceed")
        } else {
            console.error('variable and content lengths dont match');
        }

        for (let i = 0; i < this.parsedFileData.data.variables.length; i++) {

            let dataPointValues = this.getDataInformationFromContentsArray(this.parsedFileData.data.contents, i);

            let dataVariableName = this.parsedFileData.data.variables[i].name;

            let unitsID: number = await this.insertUnits(uploadModel, this.parsedFileData.data.variables[i].units)

            let reprID: number = await this.insertRep(uploadModel, this.parsedFileData.data.variables[i].repr)

            await uploadModel.insertDataPointsOfSet(dataSetID, dataVariableName, dataPointValues[0], unitsID, reprID)
            individualDataSetComments = dataPointValues[1];
        }

        await uploadModel.insertCommentsForDataSet(dataSetID, individualDataSetComments)

        return "Upload to Database was successful!"
    }

    private getDataInformationFromContentsArray(dataContentArray: any, index: number) {

        let dataPointsForVariable = [];
        let dataSetComments = [];

        for (let i = 0; i < dataContentArray.length; i++) {
            dataPointsForVariable.push(dataContentArray[i].point[index]);
            dataSetComments.push(dataContentArray[i].comments);
        }
        let contentsArrayInfo = [dataPointsForVariable, dataSetComments];
        return contentsArrayInfo;
    }

    private async insertUnits(uploadModel, units) {
        let unitsId: number
        try {
            if (units == undefined)
                unitsId = 1;
            else {
                unitsId = await uploadModel.insertUnits(units);
            }
            console.log('added units id: ' + unitsId);
        } catch (err) {
            console.log('rejected request for referenceTypeID');
        }
        return unitsId
    }

    private async insertRep(uploadModel, repr): Promise<number> {
        let reprID: number
        try {
            if (repr == undefined)
                reprID = 1;
            else {
                reprID = await uploadModel.insertRepresentation(repr);
            }
            console.log('added rep id: ' + reprID);
        } catch (err) {
            console.log('rejected request for referenceTypeID');
        }
        return reprID
    }

    private async insertReferenceType(uploadModel, referenceType): Promise<number> {
        try {
            let referenceTypeID = await uploadModel.insertReferenceType(referenceType);
            console.log('Received reference ID' + referenceTypeID);
            return referenceTypeID
        } catch (err) {
            console.log('rejected request for referenceTypeID');
        }
    }

    private async insertPublisher(uploadModel, referencePublisher): Promise<number> {
        try {
            let publisherNameId = await uploadModel.insertPublisher(referencePublisher);
            console.log('Received publisher name ID' + publisherNameId);
            return publisherNameId
        } catch (err) {
            console.log('rejected request for inserting publisherNameId')
        }
    }

    private async insertAuthors(uploadModel, referenceAuthors): Promise<Authors[]> {
        let allAuthors: Authors[];
        try {
            allAuthors = await uploadModel.insertAuthors(referenceAuthors);
            console.log('reference authors: ' + referenceAuthors);
            return allAuthors
        } catch (err) {
            console.log('reference authors not found....request rejected');
        }
    }

    private async insertMaterials(uploadModel, material): Promise<any[]> {
        try {
            let allMaterials = await uploadModel.insertMaterial(material);
            console.log('received material(s)' + material);
            return allMaterials
        } catch (err) {
            console.log('material(s) not found');
        }
    }

    private async insertPublication(uploadModel, referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors): Promise<number> {
        try {
            let publicationID = await uploadModel.insertPublication(referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors);
            console.log('received publicationID ' + publicationID);
            return publicationID
        } catch (err) {
            console.log('publicationID was not received......rejecting request');
        }
    }

    private async insertDataSetDataType(uploadModel, dataType): Promise<number> {
        let dataSetDataTypeID: number
        if (this.parsedFileData["data type"] == undefined)
            dataSetDataTypeID = 1;
        else {
            try {
                dataSetDataTypeID = await uploadModel.insertDataSetDataType(dataType)
                console.log('Received datasetTypeID: ' + dataSetDataTypeID);
            } catch (err) {
                console.log('error receiving datasetTypeID....request rejected');
            }
        }
        return dataSetDataTypeID
    }

    private async insertFullDataSet(uploadModel, dataSetName, dataSetDataTypeID, publicationID, categoryIDs, allMaterials, dataSetComments): Promise<number> {
        try {
            let datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, categoryIDs, allMaterials, dataSetComments)
            console.log('DatasetID received: ' + datasetID);
            return datasetID
        } catch (err) {
            console.log('error receiving datasetID....request rejected');
        }
    }
}