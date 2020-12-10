import { IDatasetResponseModel } from "../models/interfaces/DatasetResponseModelInterface";
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";
import { DataQueryModel } from "../models/DataQueryModel";

export class retrieveData {
    private dataQuery: DataQueryModel;

    constructor() {
        this.dataQuery = new DataQueryModel();
    }

    async getArrayOfDatasets(receivedData: IDataRequestModel) {
        let datasetReceived = receivedData.datasetId;
        let materialReceived = receivedData.material;
        let firstNameReceived = receivedData.firstName;
        let lastNameReceived = receivedData.lastName;
        let yearReceived = receivedData.year;
        let categoryReceived = receivedData.categoryId;
        let subcategoryReceived = receivedData.subcategoryId;
        let selectedDatasetIds = [];
        if (datasetReceived != undefined) {
            selectedDatasetIds = [datasetReceived];
        }
        else {
            selectedDatasetIds = await this.getDatasetIdsFromParams(materialReceived, yearReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived)
        }
        let setOfData = await this.getDataFromDatasetIds(selectedDatasetIds)
        return setOfData;
    }

    private async getDatasetIdsFromParams(materialReceived: string, yearReceived: number, firstNameReceived: string, lastNameReceived: string, categoryReceived: number, subcategoryReceived: number) {
        let materialRawData;
        let yearRawData;
        let authorRawData;
        let categoryRawData;
        let paramsEntered = 0;
        // paramsEntered is used to track how many params were entered
        let materialDatasetIds = [];
        let yearDatasetIds = [];
        let authorDatasetIds = [];
        let categoryDatasetIds = [];

        // Check which variables were received and the data sets IDs linked to each variable
        if (materialReceived != undefined) {
            paramsEntered++
            materialRawData = await this.dataQuery.getDatasetIDFromMaterial(materialReceived);
            materialDatasetIds = await this.createDatasetIdArray(materialRawData);
        }
        if (yearReceived != undefined) {
            paramsEntered++
            yearRawData = await this.dataQuery.getDatasetIDFromYear(yearReceived);
            yearDatasetIds = await this.createDatasetIdArray(yearRawData);
        }
        if (firstNameReceived != undefined && lastNameReceived != undefined) {
            paramsEntered++
            authorRawData = await this.dataQuery.getDatasetIDFromAuthor(firstNameReceived, lastNameReceived);
            authorDatasetIds = await this.createDatasetIdArray(authorRawData);
        }
        if (categoryReceived != undefined) {
            paramsEntered++
            if (subcategoryReceived != undefined) {
                categoryRawData = await this.dataQuery.getDatasetIDFromSubcategory(categoryReceived, subcategoryReceived);
            }
            else {
                categoryRawData = await this.dataQuery.getDatasetIDFromCategory(categoryReceived);
            }
            categoryDatasetIds = await this.createDatasetIdArray(categoryRawData);
        }
        let selectedDatasetIds = await this.selectDatasetIds(paramsEntered, materialDatasetIds, yearDatasetIds, authorDatasetIds, categoryDatasetIds)
        return selectedDatasetIds
    }

    private async createDatasetIdArray(rawData: any[]) {
        let datasetIdArray = [];
        for (let index = 0; index < rawData.length; index++) {
            datasetIdArray[index] = rawData[index].dataset_id;
        }
        return datasetIdArray;
    }

    private async selectDatasetIds(paramsEntered: number, materialDatasetIds: any[], yearDatasetIds: any[], authorDatasetIds: any[], categoryDatasetIds: any[]) {
        let selectedDatasetIds = []
        // Find the intersection of data sets IDs among all the different variables
        let allDatasetIds = materialDatasetIds.concat(yearDatasetIds).concat(authorDatasetIds).concat(categoryDatasetIds)
        let count: number
        let currentDatasetId: number
        for (let i = 0; i < allDatasetIds.length; i++) {
            count = 1;
            currentDatasetId = allDatasetIds[i]
            for (let j = i + 1; j < allDatasetIds.length; j++) {
                if (currentDatasetId == allDatasetIds[j]) {
                    count++
                }
            }
            if (count == paramsEntered) {
                selectedDatasetIds.push(currentDatasetId);
            }
        }
        return selectedDatasetIds;
    }

    private async getDataFromDatasetIds(selectedDatasetIds: any[]) {
        // Query each data set ID to get its information and add to array of data
        let setOfData: Array<IDatasetResponseModel> = [];
        for (let i = 0; i < selectedDatasetIds.length; i++) {
            setOfData.push(await this.dataQuery.getAllData(selectedDatasetIds[i]));
        }
        return setOfData
    }
}