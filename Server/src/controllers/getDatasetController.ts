import { Request, Response } from 'express';

import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";
import { retrieveData } from '../services/getDatasetService';

export class getDataController {
    private processedRequest: IDataRequestModel;
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
            let requestParams: any = { ...request.query };
            this.processedRequest = requestParams;
            try {
                const retrieveDataObject = new retrieveData();
                let arrayOfData = await retrieveDataObject.getArrayOfDatasets(this.processedRequest)
                return response.status(200).json(arrayOfData);
            } catch (err) {
                response.status(500).json(err);
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
        let requestParam = request.params.userUploadedDatasets;
        try {
            const retrieveDataObject = new retrieveData();
            let executionStatus = await retrieveDataObject.getUserUploadedDatasets(requestParam)
            if (executionStatus[0]) { return response.status(200).json(executionStatus[1]); }
            else { return response.status(400).json(executionStatus[1]); }
        } catch (err) {
            response.status(500).json(err);
        }
    }

    /**
     * This controller will take a request, grab the user email and data set ID, verify said ID is a number,
     * and then send the service a request to add the user's saved data set preference to the database.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForAddingSavedDataset(request: Request, response: Response) {
        let userEmail = request.params.userEmail;
        let requestParam = request.params.datasetId;
        let datasetId: number = +requestParam;
        if (isNaN(datasetId)) {
            response.status(400).json("Invalid data set ID entered");
        }
        else {
            try {
                const retrieveDataObject = new retrieveData();
                let executionStatus = await retrieveDataObject.addSavedDatasetService(userEmail, datasetId)
                if (executionStatus[0]) { return response.status(200).json(executionStatus[1]); }
                else { return response.status(400).json(executionStatus[1]); }
            } catch (err) {
                response.status(500).json(err);
            }
        }
    }

    /**
     * This controller will take a request, grab the user email and data set ID, verify said ID is a number,
     * and then send the service a request to remove the user's saved data set preference from the database.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForRemovingSavedDataset(request: Request, response: Response) {
        let userEmail = request.params.userEmail;
        let requestParam = request.params.datasetId;
        let datasetId: number = +requestParam;
        if (isNaN(datasetId)) {
            response.status(400).json("Invalid data set ID entered");
        }
        else {
            try {
                const retrieveDataObject = new retrieveData();
                let executionStatus = await retrieveDataObject.removeSavedDatasetService(userEmail, datasetId)
                if (executionStatus[0]) { return response.status(200).json(executionStatus[1]); }
                else { return response.status(400).json(executionStatus[1]); }
            } catch (err) {
                response.status(500).json(err);
            }
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
    async createRequestForUserSavedDatsets(request: Request, response: Response) {
        let requestParam = request.params.userSavedDatsets;
        try {
            const retrieveDataObject = new retrieveData();
            let executionStatus = await retrieveDataObject.getUserSavedDatasets(requestParam)
            if (executionStatus[0]) { return response.status(200).json(executionStatus[1]); }
            else { return response.status(400).json(executionStatus[1]); }
        } catch (err) {
            response.status(500).json(err);
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
}