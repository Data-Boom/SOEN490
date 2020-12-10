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
        let selectedDatasetIds = [datasetReceived];
        if (datasetReceived == undefined) {
            selectedDatasetIds = await this.getDatasetIdsFromParams(materialReceived, yearReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived)
        }
        let setOfData = await this.getDataFromDatasetIds(selectedDatasetIds)
        return setOfData;
    }

    private async getDatasetIdsFromParams(materialReceived: string, yearReceived: number, firstNameReceived: string, lastNameReceived: string, categoryReceived: number, subcategoryReceived: number) {
        let rawData;
        let paramsEntered = 0;
        // paramsEntered is used to track how many params were entered
        let materialDatasetIds = [];
        let yearDatasetIds = [];
        let authorDatasetIds = [];
        let categoryDatasetIds = [];

        // Check which variables were received and the data sets IDs linked to each variable
        if (materialReceived != undefined) {
            paramsEntered++
            rawData = await this.dataQuery.getDatasetIDFromMaterial(materialReceived);
            materialDatasetIds = await this.createDatasetIdArray(rawData);
        }
        if (yearReceived != undefined) {
            paramsEntered++
            rawData = await this.dataQuery.getDatasetIDFromYear(yearReceived);
            yearDatasetIds = await this.createDatasetIdArray(rawData);
        }
        if (firstNameReceived != undefined && lastNameReceived != undefined) {
            paramsEntered++
            rawData = await this.dataQuery.getDatasetIDFromAuthor(firstNameReceived, lastNameReceived);
            authorDatasetIds = await this.createDatasetIdArray(rawData);
        }
        if (categoryReceived != undefined) {
            paramsEntered++
            if (subcategoryReceived != undefined) {
                rawData = await this.dataQuery.getDatasetIDFromSubcategory(categoryReceived, subcategoryReceived);
            }
            else {
                rawData = await this.dataQuery.getDatasetIDFromCategory(categoryReceived);
            }
            categoryDatasetIds = await this.createDatasetIdArray(rawData);
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
        for (let i = 0; i < allDatasetIds.length; i++) {
            count = 1;
            for (let j = i + 1; j < allDatasetIds.length; j++) {
                if (allDatasetIds[i] == allDatasetIds[j]) {
                    count++
                }
            }
            if (count == paramsEntered) {
                selectedDatasetIds.push(allDatasetIds[i]);
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