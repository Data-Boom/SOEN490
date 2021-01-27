import { BadRequest } from "@tsed/exceptions";
import { IDataSetModel } from "../../genericInterfaces/DataProcessInterfaces";
import { DataUploadModel } from "../../models/DataUploadModel";
import { Authors } from "../../models/entities/Authors";
import { IAuthors } from "../../models/interfaces/AuthorsInterface";
import { IMaterials } from "../../models/interfaces/MaterialsInterface";
import { validationSchema } from "../helpers/validationSchema";


export default abstract class AbstractUploadService {
    protected uploadModel: DataUploadModel
    protected parsedFileData: any
    protected datasetId: number

    constructor(parsedFileData: IDataSetModel, datasetId: any = {}) {
        this.parsedFileData = parsedFileData
        this.datasetId = datasetId
        this.uploadModel = new DataUploadModel()
    }

    protected abstract uploadData()

    protected abstract insertDataset(uploadModel: DataUploadModel, dataSetName: string, dataSetDataTypeID: number, publicationID: number, categoryIDs: number[], allMaterials: any, dataSetComments: string)

    protected async validateExtractedData() {
        try {
            await validationSchema.validate(this.parsedFileData)
        } catch (err) {
            throw new BadRequest(err.message);
        }
    }

    protected getDataInformationFromContentsArray(dataContentArray: any, index: number) {

        let dataPointsForVariable = [];
        let dataSetComments = [];

        for (let i = 0; i < dataContentArray.length; i++) {
            dataPointsForVariable.push(dataContentArray[i].point[index]);
            dataSetComments.push(dataContentArray[i].comments);

            let contentsArrayInfo = [dataPointsForVariable, dataSetComments];
            return contentsArrayInfo;
        }
    }

    protected async insertUnitsData(uploadModel: DataUploadModel, units: string) {
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

    protected async insertRepData(uploadModel: DataUploadModel, repr: string): Promise<number> {
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

    protected async insertPublicationTypeData(uploadModel: DataUploadModel, referenceType: string): Promise<number> {
        try {
            let referenceTypeID = await uploadModel.insertPreferenceType(referenceType);
            console.log('Received reference ID' + referenceTypeID);
            return referenceTypeID
        } catch (err) {
            console.log('rejected request for referenceTypeID');
        }
    }

    protected async insertPublisherData(uploadModel: DataUploadModel, referencePublisher: string): Promise<number> {
        try {
            let publisherNameId = await uploadModel.insertPublisher(referencePublisher);
            console.log('Received publisher name ID' + publisherNameId);
            return publisherNameId
        } catch (err) {
            console.log('rejected request for inserting publisherNameId')
        }
    }

    protected async insertAuthorsData(uploadModel: DataUploadModel, referenceAuthors: IAuthors[]): Promise<Authors[]> {
        let allAuthors: Authors[];
        try {
            allAuthors = await uploadModel.insertAuthors(referenceAuthors);
            console.log('reference authors: ' + referenceAuthors);
            return allAuthors
        } catch (err) {
            console.log('reference authors not found....request rejected');
        }
    }

    protected async insertMaterialsData(uploadModel: DataUploadModel, material: IMaterials[]): Promise<any[]> {
        try {
            let allMaterials = await uploadModel.insertMaterial(material);
            console.log('received material(s)' + material);
            return allMaterials
        } catch (err) {
            console.log('material(s) not found');
        }
    }

    protected async insertPublicationData(uploadModel, referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors): Promise<number> {
        try {
            let publicationID = await uploadModel.insertPublication(referenceTitle, referenceDOI, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors);
            console.log('received publicationID ' + publicationID);
            return publicationID
        } catch (err) {
            console.log('publicationID was not received......rejecting request');
        }
    }

    protected async insertDataSetDataTypeData(uploadModel: DataUploadModel, dataType: string): Promise<number> {
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
}