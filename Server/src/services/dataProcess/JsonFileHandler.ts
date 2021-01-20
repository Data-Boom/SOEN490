import { AbstractFileHandler, FileHandlerFactory } from './IDataProcessService';
import { DataUploadModel } from '../../models/DataUploadModel'
import { Authors } from '../../models/entities/Authors';
import { IMaterials } from '../../models/interfaces/MaterialsInterface';
import { IAuthors } from '../../models/interfaces/AuthorsInterface';
import { BadRequest } from '@tsed/exceptions';
import { IResponse } from '../../genericInterfaces/ResponsesInterface';
import { validationSchema } from '../helpers/validationSchema';
const fileSystem = require('fs');


export class JsonFileFactory extends FileHandlerFactory {

    getFileHandler(filePath: string): AbstractFileHandler {
        return new JsonFileHandler(filePath)
    }
}

export class JsonFileHandler extends AbstractFileHandler {

    async parseFile(): Promise<any> {
        try {
            this.jsonData = await JSON.parse(fileSystem.readFileSync(this.filePath))
            return this.jsonData
        } catch (err) {
            throw new BadRequest("Cannot parse your file. Something is wrong with it");
        }
    }

    async validateExtractedData(jsonData: any): Promise<any> {
        try {
            await validationSchema.validate(jsonData)
            return jsonData;
        } catch (err) {
            throw new BadRequest(err.message);
        }
    }

    async uploadData(jsonData: any): Promise<string> {

        let requestResponse: IResponse = {} as any;
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

        this.jsonData = jsonData

        // Create this object after the parsing passes
        let uploadModel = new DataUploadModel();

        try {
            referenceTypeID = await uploadModel.insertReferenceType(referenceType); console.log('Received reference ID' + referenceTypeID);
        } catch (err) {
            console.log('rejected request for referenceTypeID');
        }

        referencePublisher = this.jsonData.reference.publisher;
        try {
            publisherNameId = await uploadModel.insertPublisher(referencePublisher);
            console.log('Received publisher name ID' + publisherNameId);
        } catch (err) {
            console.log('rejected request for inserting publisherNameId')
        }


        referenceAuthors = this.jsonData.reference.authors;
        let allAuthors: Authors[];
        try {
            allAuthors = await uploadModel.insertAuthors(referenceAuthors);
            console.log('reference authors: ' + referenceAuthors);
        } catch (err) {
            console.log('reference authors not found....request rejected');
        }

        referenceTitle = this.jsonData.reference.title;
        referenceDOI = this.jsonData.reference.doi;
        referencePages = this.jsonData.reference.pages;
        referenceYear = this.jsonData.reference.year;
        referenceVolume = this.jsonData.reference.volume;

        if (this.jsonData.reference.datePublished !== undefined)
            referenceDatePublished = this.jsonData.reference.datePublished;
        if (this.jsonData.reference.dateAccessed !== undefined)
            referenceDateAccessed = this.jsonData.reference.dateAccessed;

        try {
            publicationID = await uploadModel.insertPublication(referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors);
            console.log('received publicationID ' + publicationID);
        }
        catch (err) {
            console.log('publicationID was not received......rejecting request');
        }

        //check and validates if material array index contents are of string
        material = this.jsonData.material;
        let allMaterials: any[];
        try {
            allMaterials = await uploadModel.insertMaterial(material);
            console.log('received material(s)' + material);
        } catch (err) {
            console.log('material(s) not found');
        }

        category = this.jsonData.category;
        subcategory = this.jsonData.subcategory;
        let categoryIDs = await uploadModel.insertCategories(category, subcategory);

        dataType = this.jsonData["data type"];
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

        dataSetName = this.jsonData["dataset name"];
        dataSetComments = this.jsonData.data.comments;
        try {
            datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, categoryIDs, allMaterials, dataSetComments)
            console.log('DatasetID received: ' + datasetID);
        } catch (err) {
            console.log('error receiving datasetID....request rejected');
        }

        //run check on variable vs contents length to see if they're equal
        if (this.jsonData.data.variables.length == this.jsonData.data.contents[0].point.length) {
            console.log("variable and content lengths are equal....proceed")
        } else {
            console.error('variable and content lengths dont match');
        }

        for (let i = 0; i < this.jsonData.data.variables.length; i++) {

            let dataPointValues = this.getDataInformationFromContentsArray(this.jsonData.data.contents, i);

            let dataVariableName = this.jsonData.data.variables[i].name;
            let units = this.jsonData.data.variables[i].units;
            let repr = this.jsonData.data.variables[i].repr;

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

    private getDataInformationFromContentsArray = (dataContentArray, index) => {

        let dataPointsForVariable = [];
        let dataSetComments = [];

        for (let i = 0; i < dataContentArray.length; i++) {
            dataPointsForVariable.push(dataContentArray[i].point[index]);
            dataSetComments.push(dataContentArray[i].comments);
        }
        //to check if the two helper arrays are empty or not
        for (let j = 0; j < dataPointsForVariable.length; j++) {
            if ((dataPointsForVariable == null || dataPointsForVariable[j] == '') ||
                (dataSetComments == null || dataSetComments[j] == '')) {
                console.log('dataset points are empty');
            } else {
                continue;
            }
        }
        let contentsArrayInfo = [dataPointsForVariable, dataSetComments];
        return contentsArrayInfo;
    }
}