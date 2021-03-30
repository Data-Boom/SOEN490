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

        let dataSetID: number = await this.insertDataset(this.uploadModel, [this.parsedFileData.dataset_name, dataSetDataTypeID, publicationID, subcategoryID, allMaterials, this.parsedFileData.data.comments, this.userId])

        let individualDataSetComments: string[] = [];
        for (let i = 0; i < this.parsedFileData.data.variables.length; i++) {

            let dataPointValues = this.getDataInformationFromContentsArray(this.parsedFileData.data.contents, i);

            let dataVariableName = this.parsedFileData.data.variables[i].name;

            let unitsID: number = this.parsedFileData.data.variables[i].unitId

            await this.uploadModel.insertDataPointsOfSet(dataSetID, dataVariableName, dataPointValues[0], unitsID)
            individualDataSetComments = dataPointValues[1];
        }

        await this.uploadModel.insertCommentsForDataSet(dataSetID, individualDataSetComments)

        await this.uploadModel.createEntryInUnapprovedDataSets(dataSetID)

        requestResponse.message = dataSetID.toString()
        requestResponse.statusCode = 201;
        return requestResponse;
    }

    protected async insertDataset(uploadModel: DataUploadModel, arrayOfDatasetInfo: any): Promise<number> {
        try {
            return await uploadModel.insertFullDataSet(arrayOfDatasetInfo)
        } catch (err) {
            console.log('error receiving datasetID....request rejected');
        }
    }
}