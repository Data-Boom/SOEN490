import { IApprovalDatasetModel, IAuthorModel, IClientDatasetModel, IDataPointModel, IDatasetIDModel, IDatasetInfoModel, IMaterialModel, IPublicationModel } from "../models/interfaces/DatasetModelInterface";

import { DataQueryModel } from "../models/DatasetQueryModel";
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";
import { IResponse } from "../genericInterfaces/ResponsesInterface";
import { BadRequest, InternalServerError, NotFound } from '@tsed/exceptions';
import { DatasetUpdateModel } from '../models/DatasetUpdateModel';
import { DatasetApprovalModel } from "../models/DatasetApprovalModel";
import { DatasetDeleteModel } from "../models/DatasetDeleteModel";

export class DataSetService {
    private dataQuery: DataQueryModel;
    private datasetApprovalModel: DatasetApprovalModel
    private updateModel: DatasetUpdateModel
    private deleteModel: DatasetDeleteModel
    private requestResponse: IResponse

    constructor() {
        this.dataQuery = new DataQueryModel();
        this.updateModel = new DatasetUpdateModel()
        this.deleteModel = new DatasetDeleteModel()
        this.requestResponse = {} as any
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

        if (materialReceived) {
            for (let i = 0; i < materialReceived.length; i++) {
                paramsEntered++
                rawData = await this.dataQuery.getDatasetIDFromMaterial(materialReceived[i]);
                rawDatasetIds = rawDatasetIds.concat(await this.createDatasetIdArray(rawData));
            }
        }
        if (yearReceived) {
            paramsEntered++
            rawData = await this.dataQuery.getDatasetIDFromYear(yearReceived);
            rawDatasetIds = rawDatasetIds.concat(await this.createDatasetIdArray(rawData));
        }
        if (lastNameReceived) {

            paramsEntered++
            if (firstNameReceived) {
                rawData = await this.dataQuery.getDatasetIDFromAuthor(firstNameReceived, lastNameReceived);
            }
            else {
                rawData = await this.dataQuery.getDatasetIDFromAuthorLastName(lastNameReceived);
            }
            rawDatasetIds = rawDatasetIds.concat(await this.createDatasetIdArray(rawData));
        }
        if (categoryReceived) {
            paramsEntered++
            if (subcategoryReceived) {
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
        let datasetIdArray: number[] = [];
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
        let selectedDatasetIds: number[] = []
        let count: number
        for (let i = 0; i < rawDatasetIds.length; i++) {
            count = 1;
            for (let j = i + 1; j < rawDatasetIds.length; j++) {
                if (rawDatasetIds[i] == rawDatasetIds[j]) {
                    count++
                }
            }
            if (count == paramsEntered) {
                selectedDatasetIds.push(Number(rawDatasetIds[i]));
            }
        }
        return selectedDatasetIds;
    }

    private async getDataFromDatasetIds(selectedDatasetIds: number[]) {
        try {
            let rawData = await this.dataQuery.getAllData(selectedDatasetIds)
            let publication: IPublicationModel
            let dataPointComments: string[]
            let datasetInfo: IDatasetInfoModel
            let singleAuthorData: IAuthorModel
            let allAuthorData: IAuthorModel[] = []
            let singleMaterialData: IMaterialModel
            let allMaterialData: IMaterialModel[]
            let singleDataPointData: IDataPointModel
            let allDataPointData: IDataPointModel[]
            let singleDataSet: IClientDatasetModel
            let allDataSets: Array<IClientDatasetModel> = [];
            let currentDataset: number = 0
            for (let index = 0; index < selectedDatasetIds.length; index++) {
                currentDataset = rawData[2][index].dataset_id
                datasetInfo = {
                    name: rawData[2][index]?.name,
                    comments: rawData[2][index]?.comments,
                    datasetDataType: rawData[2][index]?.datasetdatatype,
                    category: rawData[2][index]?.category,
                    subcategory: rawData[2][index]?.subcategory
                }

                //Sort through publications, grab the one desired
                for (let publicationIndex = 0; publicationIndex < rawData[0].length; publicationIndex++) {
                    if (rawData[0][publicationIndex].dataset_id == currentDataset) {
                        delete rawData[0][publicationIndex].dataset_id
                        publication = rawData[0][publicationIndex]
                        rawData[0].splice(publicationIndex, 1)
                        break;
                    }
                }

                //Sort through authors, then group them accordingly
                allAuthorData = []
                for (let authorIndex = 0; authorIndex < rawData[1].length; authorIndex++) {
                    if (rawData[1][authorIndex].dataset_id == currentDataset) {
                        delete rawData[1][authorIndex].dataset_id
                        singleAuthorData = rawData[1][authorIndex]
                        allAuthorData.push(singleAuthorData)
                        rawData[1].splice(authorIndex, 1)
                        authorIndex--
                    }
                }
                publication.authors = allAuthorData

                //Sort through materials, then group them accordingly
                allMaterialData = []
                for (let materialIndex = 0; materialIndex < rawData[3].length; materialIndex++) {
                    if (rawData[3][materialIndex].dataset_id == currentDataset) {
                        delete rawData[3][materialIndex].dataset_id
                        singleMaterialData = rawData[3][materialIndex]
                        allMaterialData.push(singleMaterialData)
                        rawData[3].splice(materialIndex, 1)
                        materialIndex--
                    }
                }

                //Sort through data points, then group them accordingly
                allDataPointData = []
                for (let dataPointIndex = 0; dataPointIndex < rawData[4].length; dataPointIndex++) {
                    if (rawData[4][dataPointIndex].dataset_id == currentDataset) {
                        singleDataPointData = rawData[4][dataPointIndex]
                        allDataPointData.push(singleDataPointData)
                        rawData[4].splice(dataPointIndex, 1)
                        dataPointIndex--
                    }
                }

                //Sort through data point comments, grab the ones desired
                dataPointComments = undefined
                for (let commentIndex = 0; commentIndex < rawData[5].length; commentIndex++) {
                    if (rawData[5][commentIndex]?.dataset_id == currentDataset) {
                        dataPointComments = rawData[5][commentIndex]?.datapointcomments
                        rawData[5].splice(commentIndex, 1)
                        break;
                    }
                }

                singleDataSet = {
                    publication: publication,
                    dataset_id: currentDataset,
                    dataset_info: datasetInfo,
                    materials: allMaterialData,
                    dataPoints: allDataPointData,
                    dataPointComments: dataPointComments
                }

                allDataSets.push(singleDataSet);
            }
            return allDataSets
        } catch (error) {
            throw new InternalServerError("Something went wrong fetching from DB. Maybe its down")
        }
    }

    private async getDataFromUnapprovedDatasetIds(selectedDatasetIds: any[]) {
        try {
            let setOfData: Array<IApprovalDatasetModel> = [];
            for (let i = 0; i < selectedDatasetIds.length; i++) {
                setOfData.push(await this.dataQuery.fetchUnapprovedDataSet(selectedDatasetIds[i]));
            }
            return setOfData
        } catch (error) {
            console.error(error);
        }
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
    async getUserSavedDatasets(userReceived: number) {
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
    async removeSavedDatasetService(userId: number, datasetId: number) {
        try {
            let response = await this.dataQuery.removeSavedDatasetModel(userId, datasetId);
            if (response == undefined || response == null) {
                throw new NotFound("Could not find your saved datasets")
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response as any
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong deleting your saved datasets. Try later")
        }
    }


    /**
     * This method accepts an array of IDatasetIDModel models where each object has a data set ID that we wish to acquire
     * the full data set of. It sends this information to the createDatasetIdArray method to acquire an array containing
     * the aforementioned data set IDs. After it will then send this array of data set IDs to getDataFromDatasetIds 
     * to get all of the data sets matching those data set IDs.
     * 
     * @param rawData 
     * Array of IDatasetIDModel objects: IDatasetIDModel[]
     */
    private async getDatasetsFromRawData(rawData: IDatasetIDModel[]) {
        let selectedDatasetIds = await this.createDatasetIdArray(rawData);
        let setOfData = await this.getDataFromDatasetIds(selectedDatasetIds);
        return setOfData;
    }

    private async getUnapprovedDatasetsFromRawData(rawData: IDatasetIDModel[]) {
        let selectedDatasetIds = await this.createDatasetIdArray(rawData);
        let setOfData = await this.getDataFromUnapprovedDatasetIds(selectedDatasetIds);
        return setOfData;
    }

    /**
     * This method is used to get an array of all unapproved data set IDs. 
     * It will call a query to get a raw data packet which contains all of the unapproved data set IDs, 
     * and then it will feed this raw data packet to @getDatasetsFromRawData to get an array of data sets.
     */
    async getUnapprovedAllDatasets() {
        try {
            let datasetIds = await this.datasetApprovalModel.getUnapprovedDatasets();
            let response: IApprovalDatasetModel[];
            if (datasetIds == undefined || datasetIds == null) {
                throw new NotFound("No Unapproved Datasets in database")
            }
            else {
                response = await this.getUnapprovedDatasetsFromRawData(datasetIds);
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response as any
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong fetching all Unapproved Datasets. Try later")
        }
    }

    async getUserFlaggedDatasets(userId: number) {
        try {
            let datasetIds = await this.datasetApprovalModel.selectUserFlaggedDatasets(userId);
            let response: IApprovalDatasetModel[];
            if (datasetIds == undefined || datasetIds == null) {
                throw new NotFound("No Unapproved Datasets in database")
            }
            else {
                response = await this.getUnapprovedDatasetsFromRawData(datasetIds);
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response as any
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong fetching all Unapproved Datasets. Try later")
        }
    }

    async getAllFlaggedDatasets() {
        try {
            let datasetIds = await this.datasetApprovalModel.selectAllFlaggedDatasets();
            let response: IApprovalDatasetModel[];
            if (datasetIds == undefined || datasetIds == null) {
                throw new NotFound("No Unapproved Datasets in database")
            }
            else {
                response = await this.getUnapprovedDatasetsFromRawData(datasetIds);
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response as any
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong fetching all Unapproved Datasets. Try later")
        }
    }

    async rejectDataSet(datasetId: number) {
        try {
            let response = await this.deleteModel.verifyDatasetExists(datasetId)
            if (response == undefined || response == null) {
                throw new BadRequest("No such data set exists")
            }
            response = await this.deleteModel.rejectDataset(datasetId)
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response
            return this.requestResponse
        } catch (error) {
            if (error instanceof BadRequest) {
                throw new BadRequest(error.message)
            }
            else {
                throw new InternalServerError("Something went wrong deleting this DataSet. Maybe its down")
            }
        }
    }

    async flagNewDataset(datasetId: number, flaggedComment?: string) {
        try {
            let response = await this.updateModel.flagDataSet(datasetId, flaggedComment)
            if (response == undefined || response == null) {
                throw new BadRequest("Could not flag this Dataset")
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong with flagging this dataset. Try again later")
        }
    }

    async fetchFlaggedDatasets(userId: number) {
        try {
            //let response = await this.dataQuery.selectUserFlaggedDatasets(userId)
            let response = null
            if (response == undefined || response == null) {
                throw new BadRequest("Could fetch user flagged datasets")
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Internal server error fetching flagged datasets. Try again later")
        }
    }

    async adminApprovedDataset(datasetId: number, datasetCommentsToAppend: string) {
        try {
            await this.updateModel.updateDatasetComments(datasetId, datasetCommentsToAppend)
            let response = await this.updateModel.approveDataset(datasetId)
            if (response == undefined || response == null) {
                throw new BadRequest("No dataset under this ID")
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Internal server error approving this dataset. Try again later")
        }
    }

    async userApprovedDataset(datasetId: number) {
        try {
            let response = await this.updateModel.approveDataset(datasetId)
            if (response == undefined || response == null) {
                throw new BadRequest("No dataset under this ID")
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = response
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Internal server error approving this dataset. Try again later")
        }
    }
}