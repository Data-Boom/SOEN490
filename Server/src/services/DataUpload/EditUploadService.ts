import { BadRequest, InternalServerError } from '@tsed/exceptions';

import AbstractUploadService from "./AbstractUploadService"
import { Authors } from "../../models/entities/Authors"
import { DataUploadModel } from "../../models/DataUploadModel"
import { DatasetCommonModel } from '../../models/DatasetModels/DatasetCommonModel';
import { DatasetDeleteModel } from '../../models/DatasetModels/DatasetDeleteModel';
import { IResponse } from "../../genericInterfaces/ResponsesInterface"
import { getConnection } from "typeorm"

export default class EditUploadService extends AbstractUploadService {
    async uploadData(): Promise<IResponse> {
        let datasetDeleteModel = new DatasetDeleteModel()
        let datasetCommonModel = new DatasetCommonModel()
        let connection = getConnection()
        let requestResponse: IResponse = {} as any

        // First clear tables that need dataset ID
        let rawDatasetFKs = await datasetCommonModel.selectDatasetFKQuery(this.datasetId);
        await datasetCommonModel.deleteDatapointCommentsQuery(this.datasetId)
        await datasetDeleteModel.deleteDataPointsOfDataset(this.datasetId)
        await datasetDeleteModel.deleteMaterialsOfDataset(this.datasetId)

        // Generate and link new materials
        let allMaterials: any[] = await this.insertMaterialsData(this.uploadModel, this.parsedFileData.material)
        for (let i = 0; i < allMaterials.length; i++) {
            await connection.query("INSERT INTO dataset_materials_material (datasetId, materialId) VALUES (?, ?)", [this.datasetId, allMaterials[i].id])
        }

        // Generate new publication and get its ID
        let publicationTypeID: number = await this.insertPublicationTypeData(this.uploadModel, this.parsedFileData.reference.type)
        let publisherNameId: number = await this.insertPublisherData(this.uploadModel, this.parsedFileData.reference.publisher)
        let allAuthors: Authors[] = await this.insertAuthorsData(this.uploadModel, this.parsedFileData.reference.authors)

        let referenceTitle: string = this.parsedFileData.reference.title;
        let referenceDOI: string = this.parsedFileData.reference.doi;
        let referencePages: string = this.parsedFileData.reference.pages;
        let referenceYear: number = this.parsedFileData.reference.year;
        let referenceVolume: number = this.parsedFileData.reference.volume;
        let referenceIssue: number = this.parsedFileData.reference.issue;

        // Grab other 3 FK of data set
        let publicationID: number = await this.insertPublicationData(this.uploadModel, referenceTitle, referenceDOI, referencePages, publicationTypeID, publisherNameId, referenceYear, referenceVolume, referenceIssue, allAuthors)
        let subcategoryID: number = this.parsedFileData.subcategory;
        let dataSetDataTypeID: number = await this.insertDataSetDataTypeData(this.uploadModel, this.parsedFileData.data_type)

        // Update data set
        let arrayOfDatasetInfo = [this.datasetId, this.parsedFileData.dataset_name, dataSetDataTypeID, publicationID, subcategoryID, this.parsedFileData.data.comments]
        await this.insertDataset(this.uploadModel, arrayOfDatasetInfo)

        let individualDataSetComments: string[] = [];
        for (let i = 0; i < this.parsedFileData.data.variables.length; i++) {
            let dataPointValues = this.getDataInformationFromContentsArray(this.parsedFileData.data.contents, i);
            let dataVariableName = this.parsedFileData.data.variables[i].name;
            let unitsID: number = this.parsedFileData.data.variables[i].unitId
            await this.uploadModel.insertDataPointsOfSet(this.datasetId, dataVariableName, dataPointValues[0], unitsID)
            individualDataSetComments = dataPointValues[1];
        }
        await this.uploadModel.insertCommentsForDataSet(this.datasetId, individualDataSetComments)

        // Delete remaining old data set data
        await datasetDeleteModel.deleteDatasetDataType(rawDatasetFKs.datatypeId)
        await datasetDeleteModel.deleteAuthorsOfPublication(rawDatasetFKs.publicationId)
        await datasetDeleteModel.deletePublication(rawDatasetFKs.publicationId)
        await datasetDeleteModel.deletePublisher(rawDatasetFKs.publisherId)
        await datasetDeleteModel.deletePublicationType(rawDatasetFKs.publicationTypeId)

        if (this.clearFlag)
            await datasetCommonModel.clearDataSetFlag(this.datasetId)

        requestResponse.message = "Dataset Updated!"
        requestResponse.statusCode = 201;
        return requestResponse;
    }

    protected async insertDataset(uploadModel: DataUploadModel, arrayOfDatasetInfo: any) {
        try {
            await uploadModel.updateDataset(arrayOfDatasetInfo)
        }
        catch (error) {
            throw new InternalServerError('Internal server issue updating your dataset')
        }
    }
}