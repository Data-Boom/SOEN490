import { Request, Response } from 'express';
import { DataSetService } from '../services/DataSetService';
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";

export class DataSetController {
    private processedRequest: IDataRequestModel;
    private dataSetService: DataSetService

    constructor() {
    }

    /**
     * This controller will take a request, verify that it is valid, and if it valid will then process the request,
     * send it to the getDataService to acquire an array of data sets that match the entered search terms, and
     * then return a response with the array of data sets. If the request is invalid, or some other problem arrises, 
     * it will throw an error.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForData(request: Request, response: Response) {
        let validateData = this.validateInputData(request)
        if (!validateData) {
            response.status(400).json("Invalid search params entered");
        }
        else {
            this.dataSetService = new DataSetService();
            let requestParams: any = { ...request.query };
            this.processedRequest = requestParams;
            try {
                let arrayOfData = await this.dataSetService.getArrayOfDatasets(this.processedRequest)
                return response.status(200).json(arrayOfData);
            } catch (err) {
                response.status(400).json(err);
            }
        }
    }

    async createRequestToDeleteUserFavoriteDataSet(request: Request, response: Response) {
        let requestParam = request.params.datasetId;
        let datasetId = Number(requestParam);
        if (isNaN(datasetId)) {
            response.status(400).json("Invalid data set ID entered");
        }
        else {
            let userId: number = request.body.user.account_id
            try {
                this.dataSetService = new DataSetService();
                let requestResponse = await this.dataSetService.removeUserFavoriteDataset(userId, datasetId)
                return response.status(requestResponse.statusCode).json(requestResponse.message);
            } catch (err) {
                response.status(err.status).json(err.message);
            }
        }
    }

    /**
     * This controller will take a request, grab the user ID, and if it a real number will then process the request,
     * send it to the getDataService to acquire an array of data sets that were uploaded by this user ID, and
     * then return a response with the array of data sets. If the request is invalid, or some other problem arrises, 
     * it will throw an error.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForUserUploadedDatasets(request: Request, response: Response) {
        let userId: any = request.body.user.account_id
        try {
            this.dataSetService = new DataSetService();
            let arrayOfData = await this.dataSetService.getUserUploadedDatasets(userId)
            return response.status(200).json(arrayOfData);
        } catch (err) {
            response.status(500).json(err);
        }
    }

    /**
     * This controller will take a request, grab the user ID, and if it a real number will then process the request,
     * send it to the getDataService to acquire an array of data sets that were saved by this user ID, and
     * then return a response with the array of data sets. If the request is invalid, or some other problem arrises, 
     * it will throw an error.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForUserFavoriteDatsets(request: Request, response: Response) {
        let userId: any = request.body.user.account_id
        try {
            this.dataSetService = new DataSetService();
            let arrayOfData = await this.dataSetService.getUserFavoriteDatasets(userId)
            return response.status(200).json(arrayOfData);
        } catch (err) {
            response.status(500).json(err);
        }
    }

    //TODO: Readd later
    /**
     * This controller will take a request, grab the user email and data set ID, verify said ID is a number,
     * and then send the service a request to add the user's saved data set preference to the database.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
    async createRequestForAddingSavedDataset(request: Request, response: Response) {
        let userEmail = request.params.userEmail;
        let requestParam = request.params.datasetId;
        let datasetId: number = +requestParam;
        if (isNaN(datasetId)) {
            response.status(400).json("Invalid data set ID entered");
        }
        else {
            try {
                let executionStatus = await this.dataSetService.addSavedDatasetService(userEmail, datasetId)
                if (executionStatus[0]) { return response.status(200).json(executionStatus[1]); }
                else { return response.status(400).json(executionStatus[1]); }
            } catch (err) {
                response.status(500).json(err);
            }
        }
    }
     */

    /**
     * This controller will take a request, send it to the getDataService to acquire an array 
     * containing the unapproved data sets in the database
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForUnapprovedDatsets(request: Request, response: Response) {
        try {
            this.dataSetService = new DataSetService();
            let requestResponse = await this.dataSetService.getUnapprovedAllDatasets()
            return response.status(requestResponse.statusCode).json(requestResponse.message);
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }

    /**
     * This method verifies that a request has at least one valid search parameter and returns true if so
     * and false if not.
     * 
     * @param request 
     * An object containing the request information and parameters: Request
     */
    private validateInputData(request: Request) {
        if (request.query.hasOwnProperty('datasetId') || request.query.hasOwnProperty('material')
            || request.query.hasOwnProperty('year') || request.query.hasOwnProperty('categoryId')
            || request.query.hasOwnProperty('lastName')) { return true }
        else {
            return false
        }
    }

    async createRequestToFlagDataset(request: Request, response: Response) {
        if (!request.query && !request.query.datasetId) {
            response.status(400).json("No datasetID provided to flag dataset");
        }
        else {
            let datasetIdToFlag = Number(request.query.datasetId)
            let flaggedComments = String(request.query.flaggedComments)
            let additionalComments = String(request.query.additionalComments)
            try {
                this.dataSetService = new DataSetService();
                let requestResponse = await this.dataSetService.flagNewDataset(datasetIdToFlag, flaggedComments, additionalComments)
                return response.status(requestResponse.statusCode).json(requestResponse.message);
            } catch (error) {
                response.status(error.status).json(error.message);
            }
        }
    }

    async createRequestToRejectDataset(request: Request, response: Response) {
        let requestParam = request.params.datasetId;
        let datasetId = Number(requestParam);
        if (isNaN(datasetId)) {
            response.status(400).json("Invalid data set ID entered");
        }
        else {
            try {
                this.dataSetService = new DataSetService();
                let requestResponse = await this.dataSetService.rejectDataSet(datasetId)
                return response.status(requestResponse.statusCode).json(requestResponse.message);
            } catch (error) {
                response.status(error.status).json(error.message);
            }
        }
    }

    async createRequestForUserFlaggedDatasets(request: Request, response: Response) {
        let userId: number = request.body.user.account_id
        try {
            this.dataSetService = new DataSetService();
            let requestResponse = await this.dataSetService.fetchFlaggedDatasets(userId)
            return response.status(requestResponse.statusCode).json(requestResponse.message);
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }

    async createAdminApprovedDatasetRequest(request: Request, response: Response) {
        if (!request.query && !request.query.datasetId) {
            response.status(400).json("No datasetID provided to flag dataset");
        }
        let datasetIdToApprove = Number(request.query.datasetId)
        let datasetComments = String(request.query.datasetComments)
        try {
            this.dataSetService = new DataSetService();
            let requestResponse = await this.dataSetService.adminApprovedDataset(datasetIdToApprove, datasetComments)
            return response.status(requestResponse.statusCode).json(requestResponse.message);
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }

    async createUserApprovedDatasetRequest(request: Request, response: Response) {
        let requestParam = request.params.datasetId;
        let datasetId = Number(requestParam);
        if (isNaN(datasetId)) {
            response.status(400).json("Invalid data set ID entered");
        }
        try {
            this.dataSetService = new DataSetService();
            let requestResponse = await this.dataSetService.userApprovedDataset(datasetId)
            return response.status(requestResponse.statusCode).json(requestResponse.message);
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }

}