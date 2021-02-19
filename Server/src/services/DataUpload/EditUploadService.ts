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
        let publicationType: string = ''
        let publicationTypeID: number = await this.insertPublicationTypeData(this.uploadModel, publicationType)
        let publisherNameId: number = await this.insertPublisherData(this.uploadModel, this.parsedFileData.reference.publisher)
        let allAuthors: Authors[] = await this.insertAuthorsData(this.uploadModel, this.parsedFileData.reference.authors)

        let referenceTitle: string = this.parsedFileData.reference.title;
        let referenceDOI: string = this.parsedFileData.reference.doi;
        let referencePages: string = this.parsedFileData.reference.pages;
        let referenceYear: number = this.parsedFileData.reference.year;
        let referenceVolume: number = this.parsedFileData.reference.volume;
        let referenceDatePublished: Date = null;
        let referenceDateAccessed: Date = null;
        if (this.parsedFileData.reference.datePublished !== undefined)
            referenceDatePublished = this.parsedFileData.reference.datePublished;
        if (this.parsedFileData.reference.dateAccessed !== undefined)
            referenceDateAccessed = this.parsedFileData.reference.dateAccessed;

        // Grab other 3 FK of data set
        let publicationID: number = await this.insertPublicationData(this.uploadModel, referenceTitle, referenceDOI, referencePages, publicationTypeID, publisherNameId, referenceYear, referenceVolume, referenceDatePublished, referenceDateAccessed, allAuthors)
        let categoryIDs: number[] = await this.uploadModel.insertCategories(this.parsedFileData.category, this.parsedFileData.subcategory);
        let dataSetDataTypeID: number = await this.insertDataSetDataTypeData(this.uploadModel, this.parsedFileData.data_type)

        // Update data set
        let arrayOfDatasetInfo = [this.datasetId, this.parsedFileData.dataset_name, dataSetDataTypeID, publicationID, categoryIDs, this.parsedFileData.data.comments]
        await this.insertDataset(this.uploadModel, arrayOfDatasetInfo)

        // Run check on variable vs contents length to see if they're equal for data points and insert
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
            await this.uploadModel.insertDataPointsOfSet(this.datasetId, dataVariableName, dataPointValues[0], unitsID, reprID)
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