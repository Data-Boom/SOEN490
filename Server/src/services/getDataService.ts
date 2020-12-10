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
        console.log(receivedData.material);
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

    private async getDatasetIdsFromParams(materialReceived: string[], yearReceived: number, firstNameReceived: string, lastNameReceived: string, categoryReceived: number, subcategoryReceived: number) {
        let rawData;
        let paramsEntered = 0;
        // paramsEntered is used to track how many params were entered
        let rawDatasetIds = [];

        // Check which variables were received and the data sets IDs linked to each variable
        if (materialReceived != undefined) {
            for (let i = 0; i < materialReceived.length; i++) {
                paramsEntered++
                rawData = await this.dataQuery.getDatasetIDFromMaterial(materialReceived[i]);
                rawDatasetIds = rawDatasetIds.concat(await this.createDatasetIdArray(rawData));
            }
        }
        if (yearReceived != undefined) {
            paramsEntered++
            rawData = await this.dataQuery.getDatasetIDFromYear(yearReceived);
            rawDatasetIds = rawDatasetIds.concat(await this.createDatasetIdArray(rawData));
        }
        if (firstNameReceived != undefined && lastNameReceived != undefined) {
            paramsEntered++
            rawData = await this.dataQuery.getDatasetIDFromAuthor(firstNameReceived, lastNameReceived);
            rawDatasetIds = rawDatasetIds.concat(await this.createDatasetIdArray(rawData));
        }
        if (categoryReceived != undefined) {
            paramsEntered++
            if (subcategoryReceived != undefined) {
                rawData = await this.dataQuery.getDatasetIDFromSubcategory(categoryReceived, subcategoryReceived);
            }
            else {
                rawData = await this.dataQuery.getDatasetIDFromCategory(categoryReceived);
            }
            rawDatasetIds = rawDatasetIds.concat(await this.createDatasetIdArray(rawData));
        }
        let selectedDatasetIds = await this.selectDatasetIds(paramsEntered, rawDatasetIds)
        return selectedDatasetIds
    }

    private async createDatasetIdArray(rawData: any[]) {
        let datasetIdArray = [];
        for (let index = 0; index < rawData.length; index++) {
            datasetIdArray[index] = rawData[index].dataset_id;
        }
        return datasetIdArray;
    }

    private async selectDatasetIds(paramsEntered: number, rawDatasetIds: any[]) {
        let selectedDatasetIds = []
        // Find the intersection of data sets IDs among all the different variables
        let count: number
        for (let i = 0; i < rawDatasetIds.length; i++) {
            count = 1;
            for (let j = i + 1; j < rawDatasetIds.length; j++) {
                if (rawDatasetIds[i] == rawDatasetIds[j]) {
                    count++
                }
            }
            if (count == paramsEntered) {
                selectedDatasetIds.push(rawDatasetIds[i]);
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