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
            response.status(400).send("Invalid search params entered");
        }
        else {
            let requestParams: any = { ...request.query };
            console.log(requestParams, 'requestParams');
            this.processedRequest = requestParams;
            try {
                const retrieveDataObject = new retrieveData();
                let arrayOfData = await retrieveDataObject.getArrayOfDatasets(this.processedRequest)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(400).send(err);
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
        let userId: number = +requestParam;
        if (isNaN(userId)) {
            response.status(400).send("Invalid search params entered");
        }
        else {
            try {
                const retrieveDataObject = new retrieveData();
                let arrayOfData = await retrieveDataObject.getUserUploadedDatasets(userId)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(500).send(err);
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
        let userId: number = +requestParam;
        if (isNaN(userId)) {
            response.status(500).send("Invalid search params entered");
        }
        else {
            try {
                const retrieveDataObject = new retrieveData();
                let arrayOfData = await retrieveDataObject.getUserSavedDatasets(userId)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(500).send(err);
            }
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