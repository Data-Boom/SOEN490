import { DataUploadModel } from "../../models/DataUploadModel"
import { Authors } from "../../models/entities/Authors";
import { BadRequest } from '@tsed/exceptions';
import { IResponse } from "../../genericInterfaces/ResponsesInterface";
import AbstractUploadService from "./AbstractUploadService";

export class UnapprovedUploadService extends AbstractUploadService {

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

        let dataSetID: number = await this.insertDataset(this.uploadModel, this.parsedFileData["dataset name"], dataSetDataTypeID, publicationID, categoryIDs, allMaterials, this.parsedFileData.data.comments)

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

    protected async insertDataset(uploadModel: DataUploadModel, dataSetName: string, dataSetDataTypeID: number, publicationID: number, categoryIDs: number[], allMaterials: any, dataSetComments: string): Promise<number> {
        try {
            let datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, categoryIDs, allMaterials, dataSetComments)
            console.log('DatasetID received: ' + datasetID);
            return datasetID
        } catch (err) {
            console.log('error receiving datasetID....request rejected');
        }
    }
}