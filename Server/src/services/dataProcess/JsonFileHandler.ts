import { AbstractFileHandler, FileHandlerFactory } from './IDataProcessService';
import { DataUploadModel } from '../../models/DataUploadModel'
import { Authors } from '../../models/entities/Authors';
import { IMaterials } from '../../models/interfaces/MaterialsInterface';
import { IAuthors } from '../../models/interfaces/AuthorsInterface';
import { BadRequest } from '@tsed/exceptions';
import { validationSchema } from '../helpers/validationSchema';
import { IJsonDatasetModel } from '../../genericInterfaces/DataProcessInterfaces'
const fileSystem = require('fs');


export class JsonFileFactory extends FileHandlerFactory {

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

        let category: string = '';
        let subcategory: string = '';
        let dataSetName: string = '';
        let dataType: string = '';
        let dataSetComments: string = '';
        let individualDataSetComments: string[] = [];
        let material: IMaterials[] = [];
        let referenceType: string = '';
        let referencePublisher: string = '';
        let referenceTitle: string = '';
        let referenceDOI: string = '';
        let referenceAuthors: IAuthors[] = [];
        let referenceYear: number;
        let referencePages: number;
        let referenceVolume: number;
        let referenceTypeID: number;
        let referenceDatePublished: Date = null;
        let referenceDateAccessed: Date = null;
        let publisherNameId: number;
        let publicationID: number;
        let dataSetDataTypeID: number;
        let datasetID: number;
        let unitsID: number;
        let reprID: number;

        this.parsedFileData = jsonData

        // Create this object after the parsing passes
        let uploadModel = new DataUploadModel();

        try {
            referenceTypeID = await uploadModel.insertReferenceType(referenceType); console.log('Received reference ID' + referenceTypeID);
        } catch (err) {
            console.log('rejected request for referenceTypeID');
        }

        referencePublisher = this.parsedFileData.reference.publisher;
        try {
            publisherNameId = await uploadModel.insertPublisher(referencePublisher);
            console.log('Received publisher name ID' + publisherNameId);
        } catch (err) {
            console.log('rejected request for inserting publisherNameId')
        }


        referenceAuthors = this.parsedFileData.reference.authors;
        let allAuthors: Authors[];
        try {
            allAuthors = await uploadModel.insertAuthors(referenceAuthors);
            console.log('reference authors: ' + referenceAuthors);
        } catch (err) {
            console.log('reference authors not found....request rejected');
        }

        referenceTitle = this.parsedFileData.reference.title;
        referenceDOI = this.parsedFileData.reference.doi;
        referencePages = this.parsedFileData.reference.pages;
        referenceYear = this.parsedFileData.reference.year;
        referenceVolume = this.parsedFileData.reference.volume;

        if (this.parsedFileData.reference.datePublished !== undefined)
            referenceDatePublished = this.parsedFileData.reference.datePublished;
        if (this.parsedFileData.reference.dateAccessed !== undefined)
            referenceDateAccessed = this.parsedFileData.reference.dateAccessed;

        try {
            publicationID = await uploadModel.insertPublication(referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors);
            console.log('received publicationID ' + publicationID);
        }
        catch (err) {
            console.log('publicationID was not received......rejecting request');
        }

        material = this.parsedFileData.material;
        let allMaterials: any[];
        try {
            allMaterials = await uploadModel.insertMaterial(material);
            console.log('received material(s)' + material);
        } catch (err) {
            console.log('material(s) not found');
        }

        category = this.parsedFileData.category;
        subcategory = this.parsedFileData.subcategory;
        let categoryIDs = await uploadModel.insertCategories(category, subcategory);

        dataType = this.parsedFileData["data type"];
        if (dataType == undefined)
            dataSetDataTypeID = 1;
        else {
            try {
                dataSetDataTypeID = await uploadModel.insertDataSetDataType(dataType)
                console.log('Received datasetTypeID: ' + dataSetDataTypeID);
            } catch (err) {
                console.log('error receiving datasetTypeID....request rejected');
            }
        }

        dataSetName = this.parsedFileData["dataset name"];
        dataSetComments = this.parsedFileData.data.comments;
        try {
            datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, categoryIDs, allMaterials, dataSetComments)
            console.log('DatasetID received: ' + datasetID);
        } catch (err) {
            console.log('error receiving datasetID....request rejected');
        }

        //run check on variable vs contents length to see if they're equal
        if (this.parsedFileData.data.variables.length == this.parsedFileData.data.contents[0].point.length) {
            console.log("variable and content lengths are equal....proceed")
        } else {
            console.error('variable and content lengths dont match');
        }

        for (let i = 0; i < this.parsedFileData.data.variables.length; i++) {

            let dataPointValues = this.getDataInformationFromContentsArray(this.parsedFileData.data.contents, i);

            let dataVariableName = this.parsedFileData.data.variables[i].name;
            let units = this.parsedFileData.data.variables[i].units;
            let repr = this.parsedFileData.data.variables[i].repr;

            try {
                if (units == undefined)
                    unitsID = 1;
                else {
                    unitsID = await uploadModel.insertUnits(units);
                }
                console.log('added units id: ' + unitsID);
                if (repr == undefined)
                    reprID = 1;
                else {
                    reprID = await uploadModel.insertRepresentation(repr);
                }
                console.log('added rep id: ' + reprID);
            } catch (err) {
                console.log('could not find units and representation ID....request rejected');
            }
            await uploadModel.insertDataPointsOfSet(datasetID, dataVariableName, dataPointValues[0], unitsID, reprID)
            individualDataSetComments = dataPointValues[1];
        }

        await uploadModel.insertDataPointsOfSetComments(datasetID, individualDataSetComments)

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
}