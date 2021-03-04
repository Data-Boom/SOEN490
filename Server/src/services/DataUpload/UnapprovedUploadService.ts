import AbstractUploadService from "./AbstractUploadService";
import { Authors } from "../../models/entities/Authors";
import { BadRequest } from '@tsed/exceptions';
import { DataUploadModel } from "../../models/DataUploadModel"
import { IResponse } from "../../genericInterfaces/ResponsesInterface";

export class UnapprovedUploadService extends AbstractUploadService {

    async uploadData(): Promise<IResponse> {

        let requestResponse: IResponse = {} as any

        let publicationType: string = ''
        let publicationTypeID: number = await this.insertPublicationTypeData(this.uploadModel, publicationType)

        let publisherNameId: number = await this.insertPublisherData(this.uploadModel, this.parsedFileData.reference.publisher)

        let allAuthors: Authors[] = await this.insertAuthorsData(this.uploadModel, this.parsedFileData.reference.authors)

        let referenceTitle: string = this.parsedFileData.reference.title;
        let referenceDOI: string = this.parsedFileData.reference.doi;
        let referencePages: string = this.parsedFileData.reference.pages;
        let referenceYear: number = this.parsedFileData.reference.year;
        let referenceVolume: number = this.parsedFileData.reference.volume;
        let referenceIssue: number = this.parsedFileData.reference.issue;
        let publicationID: number = await this.insertPublicationData(this.uploadModel, referenceTitle, referenceDOI, referencePages, publicationTypeID, publisherNameId, referenceYear, referenceVolume, referenceIssue, allAuthors)

        let allMaterials: any[] = await this.insertMaterialsData(this.uploadModel, this.parsedFileData.material)

        let subcategoryID: number = this.parsedFileData.subcategory;

        let dataSetDataTypeID: number = await this.insertDataSetDataTypeData(this.uploadModel, this.parsedFileData.data_type)

        let dataSetID: number = await this.insertDataset(this.uploadModel, this.parsedFileData.dataset_name, dataSetDataTypeID, publicationID, subcategoryID, allMaterials, this.parsedFileData.data.comments, this.userId)

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

            let unitsID: number = this.parsedFileData.data.variables[i].unitId

            let reprID: number = await this.insertRepData(this.uploadModel, this.parsedFileData.data.variables[i].repr)

            await this.uploadModel.insertDataPointsOfSet(dataSetID, dataVariableName, dataPointValues[0], unitsID, reprID)
            individualDataSetComments = dataPointValues[1];
        }

        await this.uploadModel.insertCommentsForDataSet(dataSetID, individualDataSetComments)

        await this.uploadModel.createEntryInUnapprovedDataSets(dataSetID)

        requestResponse.message = dataSetID.toString()
        requestResponse.statusCode = 201;
        return requestResponse;
    }

    protected async insertDataset(uploadModel: DataUploadModel, dataSetName: string, dataSetDataTypeID: number, publicationID: number, subcategoryID: number, allMaterials: any, dataSetComments: string, userId: number): Promise<number> {
        try {
            let datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, subcategoryID, allMaterials, dataSetComments, userId)
            return datasetID
        } catch (err) {
            console.log('error receiving datasetID....request rejected');
        }
    }
}