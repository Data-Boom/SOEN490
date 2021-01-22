import { IDatasetModel, IDatasetResponseModel } from "../models/interfaces/DatasetResponseModelInterface";
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";
import { DataQueryModel } from "../models/DatasetQueryModel";

export class retrieveData {
    private dataQuery: DataQueryModel;

    constructor() {
        this.dataQuery = new DataQueryModel();
    }

    /**
     * This is the 'main' method of database searches. It receives all the data and then it does a check if it 
     * was given an array of data set IDs. If it did not receive an array of data set IDs, 
     * it will call @getDatasetIdsFromParams to grab an array of data set IDs based on the various search
     * parameters (materials, authors, category, and/or subcategory). Then with the newly generated array of 
     * data set IDs, or if such an array was received at the beginning, this method will then call 
     * @getDataFromDatasetIds for retreving the information of the data sets themselves.
     * 
     * @param receivedData 
     * This param is an object of type IDataRequestModel. 
     * It contains all the sorted search parameters, that being any combination of the following:
     * An array of data set IDs: number[]
     * An array of materials, where each material is either the composition or the material details: string[]
     * The first name of an author: string
     * The last name of an author: string 
     * Publication year: number
     * A category ID: number
     * A subcategory ID: number
     */
    async getArrayOfDatasets(receivedData: IDataRequestModel) {
        let datasetReceived = receivedData.datasetId;
        let materialReceived = receivedData.material;
        let firstNameReceived = receivedData.firstName;
        let lastNameReceived = receivedData.lastName;
        let yearReceived = receivedData.year;
        let categoryReceived = receivedData.categoryId;
        let subcategoryReceived = receivedData.subcategoryId;
        let selectedDatasetIds = datasetReceived;
        if (datasetReceived == undefined) {
            selectedDatasetIds = await this.getDatasetIdsFromParams(materialReceived, yearReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived)
        }
        let setOfData = await this.getDataFromDatasetIds(selectedDatasetIds)
        return setOfData;
    }

    /**
     * This method is used to get an array of data set IDs that match all the entered search parameters. 
     * Notably at the beginning it declares paramsEntered, which is a number value that will keep 
     * track of how many search parameters were entered, and rawDatasetIds which is an array that will
     * contain the unsorted data set IDs that are connected to each individual parameter.
     * 
     * After this, for each parameter the method will check if the parameter is defined and then 
     * for each valid value it shall increment paramsEntered, call a query to get a raw data packet 
     * which contains the data set IDs of this parameter, and then it will feed this raw data packet to 
     * @createDatasetIdArray to get an array of data set IDs and append this new array to rawDatasetIds.
     * 
     * It is worth noting that a array of materials are received, and thus that entire array is looped
     * through to check all included materials, each check using the process described above. 
     * For subcategory, that parameter is always paired with a category, and thus when a
     * category is defined there is a second check to see if a subcategory is included, and will run
     * a different query to the data base if so.
     * 
     * Once all the parameters have been analyzed, the paramsEntered and rawDatasetIds are passed to
     * the @selectDatasetIds method to generate an array containing all the common data set IDs among
     * the parameters.
     * 
     * @param materialReceived 
     * An array of materials, where each material is either the composition or the material details: string[]
     * @param yearReceived 
     * Publication year: number
     * @param firstNameReceived 
     * The first name of an author: string
     * @param lastNameReceived 
     * The last name of an author: string 
     * @param categoryReceived 
     * A category ID: number
     * @param subcategoryReceived 
     * A subcategory ID: number
     */
    private async getDatasetIdsFromParams(materialReceived: string[], yearReceived: number, firstNameReceived: string, lastNameReceived: string, categoryReceived: number, subcategoryReceived: number) {
        let rawData;
        let paramsEntered = 0;
        let rawDatasetIds = [];

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
        if (lastNameReceived != undefined) {
            paramsEntered++
            if (firstNameReceived != undefined) {
                rawData = await this.dataQuery.getDatasetIDFromAuthor(firstNameReceived, lastNameReceived);
            }
            else {
                rawData = await this.dataQuery.getDatasetIDFromAuthorLastName(lastNameReceived);
            }
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

    /**
     * This method accepts an array of raw data packets and iterates through the array to take each packet's
     * data set ID and appends this number to a new array. Once the loop completes, the new array is returned.
     * @param rawData 
     * This is an array of raw data packets (aka. JSON objects): any[]
     */
    private async createDatasetIdArray(rawData: any[]) {
        let datasetIdArray = [];
        for (let index = 0; index < rawData.length; index++) {
            datasetIdArray[index] = rawData[index].dataset_id;
        }
        return datasetIdArray;
    }

    /**
     * This method takes an array of numbers, specifically data set IDs, iterates through this array, 
     * and checks each array entry to see if the total occurances of this particular entry matches the 
     * paramsEntered number. If there is a match, then the ID in question is one that is desired, and
     * is appended to the selectedDatasetIds array. Once the looping is complete, the 
     * selectedDatasetIds array is returned.
     * 
     * @param paramsEntered 
     * Number that will be used to determine if a particular data set ID makes the cut: number
     * @param rawDatasetIds 
     * An array formed from combining multiple data set IDs arrays together: any[]
     */
    private async selectDatasetIds(paramsEntered: number, rawDatasetIds: any[]) {
        let selectedDatasetIds = []
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

    /**
     * This declares an array of IDatasetResponseModel objects called setOfData and each IDatasetResponseModel 
     * contains: a publication object, an array of author objects, a data set object, an array of material objects, 
     * an array of data point objects, and a data point comments object.
     * It then loops through the received array of data set IDs and runs a @getAllData query for each individual 
     * entry in the array and appends the returned IDatasetResponseModel object to setOfData. Once the loop is 
     * completed, setOfData is returned. 
     *  
     * @param selectedDatasetIds 
     * This is an array containing the data set IDs that we wish to get the full data set of: any[]
     */
    private async getDataFromDatasetIds(selectedDatasetIds: any[]) {
        let setOfData: Array<IDatasetResponseModel> = [];
        for (let i = 0; i < selectedDatasetIds.length; i++) {
            setOfData.push(await this.dataQuery.getAllData(selectedDatasetIds[i]));
        }
        return setOfData
    }

    /**
     * This method is used to get an array of data set IDs that were uploaded by the specifed user ID. 
     * It will call a query to get a raw data packet which contains the data set IDs matching this parameter, 
     * and then it will feed this raw data packet to @getDatasetsFromRawData to get an array of data sets.
     * 
     * @param userReceived
     * Account ID: number
     */
    async getUserUploadedDatasets(userReceived: string) {
        let rawData = await this.dataQuery.getUploadedDatasetIDOfUser(userReceived);
        if (rawData[0]) {
            let setOfData = await this.getDatasetsFromRawData(rawData[1]);
            return [true, setOfData];
        }
        else {
            return rawData;
        }
    }

    /**
     * This method is used to get an array of data set IDs that were favorited by the specifed user ID. 
     * It will call a query to get a raw data packet which contains the data set IDs matching this parameter, 
     * and then it will feed this raw data packet to @getDatasetsFromRawData to get an array of data sets.
     * 
     * @param userReceived
     * Account ID: number
     */
    async getUserSavedDatasets(userReceived: string) {
        let rawData = await this.dataQuery.getSavedDatasetIDOfUser(userReceived);
        if (rawData[0]) {
            let setOfData = await this.getDatasetsFromRawData(rawData[1]);
            return [true, setOfData];
        }
        else {
            return rawData;
        }
    }

    /**
     * This method is used to add a saved data set of a user. It will take a user's email and a data set ID
     * and send this to the service for input.
     * 
     * @param userEmail
     * User's Email: string
     * @param datasetId
     * Data Set ID: number
     */
    async addSavedDatasetService(userEmail: string, datasetId: number) {
        let executionStatus = await this.dataQuery.addSavedDatasetModel(userEmail, datasetId);
        return executionStatus;
    }

    /**
     * This method is used to remove a saved data set from the user's favorites. It will take a user's email 
     * and a data set ID and send this to the service for input.
     * 
     * @param userEmail
     * User's Email: string
     * @param datasetId
     * Data Set ID: number
     */
    async removeSavedDatasetService(userEmail: string, datasetId: number) {
        let executionStatus = await this.dataQuery.removeSavedDatasetModel(userEmail, datasetId);
        return executionStatus;
    }

    /**
     * This method accepts an array of IDatasetModel models where each object has a data set ID that we wish to acquire
     * the full data set of. It sends this information to the createDatasetIdArray method to acquire an array containing
     * the aforementioned data set IDs. After it will then send this array of data set IDs to getDataFromDatasetIds 
     * to get all of the data sets matching those data set IDs.
     * 
     * @param rawData 
     * Array of IDatasetModel objects: IDatasetModel[]
     */
    private async getDatasetsFromRawData(rawData: IDatasetModel[]) {
        let selectedDatasetIds = await this.createDatasetIdArray(rawData);
        let setOfData = await this.getDataFromDatasetIds(selectedDatasetIds);
        return setOfData;
    }
}