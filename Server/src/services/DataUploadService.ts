import { DataUploadModel } from "../models/DataUploadModel"
import { DataQueryModel } from "../models/DatasetQueryModel"
import { Authors } from "../models/entities/Authors";
import { validationSchema } from "./helpers/validationSchema";
import { BadRequest } from '@tsed/exceptions';
import { IResponse } from "../genericInterfaces/ResponsesInterface";
import { IMaterials } from "../models/interfaces/MaterialsInterface";
import { IAuthors } from "../models/interfaces/AuthorsInterface";

export class DataUploadService {
    private uploadModel: DataUploadModel
    private parsedFileData: any

    constructor(parsedFileData: any) {
        this.parsedFileData = parsedFileData
        this.uploadModel = new DataUploadModel()
    }

    async validateExtractedData() {
        try {
            await validationSchema.validate(this.parsedFileData)
        } catch (err) {
            throw new BadRequest(err.message);
        }
    }

    async uploadData(): Promise<IResponse> {

        let requestResponse: IResponse = {} as any

        let publicationType: string = ''
        let publicationTypeID: number = await this.insertPublicationTypeData(this.uploadModel, publicationType)

        let publisherNameId: number = await this.insertPublisherData(this.uploadModel, this.parsedFileData.reference.publisher)

        let allAuthors: Authors[] = await this.insertAuthorsData(this.uploadModel, this.parsedFileData.reference.authors)

        let referenceTitle: string = this.parsedFileData.reference.title;
        let referenceDOI: string = this.parsedFileData.reference.doi;
        let referencePages: number = this.parsedFileData.reference.pages;
        let referenceYear: number = this.parsedFileData.reference.year;
        let referenceVolume: number = this.parsedFileData.reference.volume;

        let referenceDatePublished: Date = null;
        let referenceDateAccessed: Date = null;

        if (this.parsedFileData.reference.datePublished !== undefined)
            referenceDatePublished = this.parsedFileData.reference.datePublished;
        if (this.parsedFileData.reference.dateAccessed !== undefined)
            referenceDateAccessed = this.parsedFileData.reference.dateAccessed;

        let publicationID: number = await this.insertPublicationData(this.uploadModel, referenceTitle, referenceDOI, referencePages, publicationTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors)

        let allMaterials: any[] = await this.insertMaterialsData(this.uploadModel, this.parsedFileData.material)

        let categoryIDs: number[] = await this.uploadModel.insertCategories(this.parsedFileData.category, this.parsedFileData.subcategory);

        let dataSetDataTypeID: number = await this.insertDataSetDataTypeData(this.uploadModel, this.parsedFileData["data type"])

        let dataSetID: number = await this.insertFullDataSetData(this.uploadModel, this.parsedFileData["dataset name"], dataSetDataTypeID, publicationID, categoryIDs, allMaterials, this.parsedFileData.data.comments)

        //run check on variable vs contents length to see if they're equal
        if (this.parsedFileData.data.variables.length == this.parsedFileData.data.contents[0].point.length) {
            console.log("variable and content lengths are equal....proceed")
        } else {
            throw new BadRequest('variable and content lengths dont match')
        }

        let individualDataSetComments: string[] = [];
        for (let i = 0; i < this.parsedFileData.data.variables.length; i++) {

            let dataPointValues = this.getDataInformationFromContentsArray(this.parsedFileData.data.contents, i);

            let dataVariableName = this.parsedFileData.data.variables[i].name;

            let unitsID: number = await this.insertUnitsData(this.uploadModel, this.parsedFileData.data.variables[i].units)

            let reprID: number = await this.insertRepData(this.uploadModel, this.parsedFileData.data.variables[i].repr)

            await this.uploadModel.insertDataPointsOfSet(dataSetID, dataVariableName, dataPointValues[0], unitsID, reprID)
            individualDataSetComments = dataPointValues[1];
        }

        await this.uploadModel.insertCommentsForDataSet(dataSetID, individualDataSetComments)

        await this.uploadModel.createEntryInUnapprovedDataSets(dataSetID)

        requestResponse.message = "Upload to Database was successful!"
        requestResponse.statusCode = 201;
        return requestResponse;
    }

    async editedUploadedDataset(datasetId: number): Promise<IResponse> {

        let requestResponse: IResponse = {} as any

        let publicationType: string = ''
        let publicationTypeID: number = await this.insertPublicationTypeData(this.uploadModel, publicationType)

        let publisherNameId: number = await this.insertPublisherData(this.uploadModel, this.parsedFileData.reference.publisher)

        let allAuthors: Authors[] = await this.insertAuthorsData(this.uploadModel, this.parsedFileData.reference.authors)

        let referenceTitle: string = this.parsedFileData.reference.title;
        let referenceDOI: string = this.parsedFileData.reference.doi;
        let referencePages: number = this.parsedFileData.reference.pages;
        let referenceYear: number = this.parsedFileData.reference.year;
        let referenceVolume: number = this.parsedFileData.reference.volume;

        let referenceDatePublished: Date = null;
        let referenceDateAccessed: Date = null;

        if (this.parsedFileData.reference.datePublished !== undefined)
            referenceDatePublished = this.parsedFileData.reference.datePublished;
        if (this.parsedFileData.reference.dateAccessed !== undefined)
            referenceDateAccessed = this.parsedFileData.reference.dateAccessed;

        let publicationID: number = await this.insertPublicationData(this.uploadModel, referenceTitle, referenceDOI, referencePages, publicationTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors)

        let allMaterials: any[] = await this.insertMaterialsData(this.uploadModel, this.parsedFileData.material)

        let categoryIDs: number[] = await this.uploadModel.insertCategories(this.parsedFileData.category, this.parsedFileData.subcategory);

        let dataSetDataTypeID: number = await this.insertDataSetDataTypeData(this.uploadModel, this.parsedFileData["data type"])

        //TODO: First fetch datasetID, Then update its values

        let updatedDataset: any = await this.updateDataset(this.uploadModel, datasetId)

        //run check on variable vs contents length to see if they're equal
        if (this.parsedFileData.data.variables.length == this.parsedFileData.data.contents[0].point.length) {
            console.log("variable and content lengths are equal....proceed")
        } else {
            throw new BadRequest('variable and content lengths dont match')
        }

        let individualDataSetComments: string[] = [];
        for (let i = 0; i < this.parsedFileData.data.variables.length; i++) {

            let dataPointValues = this.getDataInformationFromContentsArray(this.parsedFileData.data.contents, i);

            let dataVariableName = this.parsedFileData.data.variables[i].name;

            let unitsID: number = await this.insertUnitsData(this.uploadModel, this.parsedFileData.data.variables[i].units)

            let reprID: number = await this.insertRepData(this.uploadModel, this.parsedFileData.data.variables[i].repr)

            await this.uploadModel.insertDataPointsOfSet(dataSetID, dataVariableName, dataPointValues[0], unitsID, reprID)
            individualDataSetComments = dataPointValues[1];
        }

        await this.uploadModel.insertCommentsForDataSet(dataSetID, individualDataSetComments)

        requestResponse.message = "Dataset Updated!"
        requestResponse.statusCode = 201;
        return requestResponse;
    }
    private getDataInformationFromContentsArray(dataContentArray: any, index: number) {

        let dataPointsForVariable = [];
        let dataSetComments = [];

        for (let i = 0; i < dataContentArray.length; i++) {
            dataPointsForVariable.push(dataContentArray[i].point[index]);
            dataSetComments.push(dataContentArray[i].comments);

            let contentsArrayInfo = [dataPointsForVariable, dataSetComments];
            return contentsArrayInfo;
        }
    }

    private async insertUnitsData(uploadModel: DataUploadModel, units: string) {
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

    private async insertRepData(uploadModel: DataUploadModel, repr: string): Promise<number> {
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

    private async insertPublicationTypeData(uploadModel: DataUploadModel, referenceType: string): Promise<number> {
        try {
            let referenceTypeID = await uploadModel.insertPreferenceType(referenceType);
            console.log('Received reference ID' + referenceTypeID);
            return referenceTypeID
        } catch (err) {
            console.log('rejected request for referenceTypeID');
        }
    }

    private async insertPublisherData(uploadModel: DataUploadModel, referencePublisher: string): Promise<number> {
        try {
            let publisherNameId = await uploadModel.insertPublisher(referencePublisher);
            console.log('Received publisher name ID' + publisherNameId);
            return publisherNameId
        } catch (err) {
            console.log('rejected request for inserting publisherNameId')
        }
    }

    private async insertAuthorsData(uploadModel: DataUploadModel, referenceAuthors: IAuthors[]): Promise<Authors[]> {
        let allAuthors: Authors[];
        try {
            allAuthors = await uploadModel.insertAuthors(referenceAuthors);
            console.log('reference authors: ' + referenceAuthors);
            return allAuthors
        } catch (err) {
            console.log('reference authors not found....request rejected');
        }
    }

    private async insertMaterialsData(uploadModel: DataUploadModel, material: IMaterials[]): Promise<any[]> {
        try {
            let allMaterials = await uploadModel.insertMaterial(material);
            console.log('received material(s)' + material);
            return allMaterials
        } catch (err) {
            console.log('material(s) not found');
        }
    }

    private async insertPublicationData(uploadModel, referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors): Promise<number> {
        try {
            let publicationID = await uploadModel.insertPublication(referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors);
            console.log('received publicationID ' + publicationID);
            return publicationID
        } catch (err) {
            console.log('publicationID was not received......rejecting request');
        }
    }

    private async insertDataSetDataTypeData(uploadModel: DataUploadModel, dataType: string): Promise<number> {
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

    private async insertFullDataSetData(uploadModel: DataUploadModel, dataSetName: string, dataSetDataTypeID: number, publicationID: number, categoryIDs: number[], allMaterials: any, dataSetComments: string): Promise<number> {
        try {
            let datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, categoryIDs, allMaterials, dataSetComments)
            console.log('DatasetID received: ' + datasetID);
            return datasetID
        } catch (err) {
            console.log('error receiving datasetID....request rejected');
        }
    }

    private async updateDataset(uploadModel: DataUploadModel, datasetId: number, dataSetName: string, dataSetDataTypeID: number, publicationID: number, categoryIDs: number[], allMaterials: any, dataSetComments: string) {

        try {
            let allData = await uploadModel.updateDataset(datasetId, dataSetName, dataSetDataTypeID, publicationID, categoryIDs, allMaterials, dataSetComments)
        }
        catch (err) {
            console.log('error receiving datasetID....request rejected');
        }
    }
}