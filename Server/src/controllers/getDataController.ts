import { Request, Response } from 'express';
import { retrieveData } from '../services/getDataService';
import { IDataRequestModel, IUserUploadsModel } from "../models/interfaces/DataRequestModelInterface";

export class getDataController {
    private processedRequest: IDataRequestModel;
    private userId: IUserUploadsModel;
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
            response.status(500).send("Invalid search params entered");
        }
        else {
            let requestParams: any = { ...request.query };
            this.processedRequest = requestParams;
            try {
                const retrieveDataObject = new retrieveData();
                let arrayOfData = await retrieveDataObject.getArrayOfDatasets(this.processedRequest)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(500).send(err);
            }
        }
    }

    async createRequestForUserUploads(request: Request, response: Response) {
        let requestParams: any = { ...request.params };
        this.userId = requestParams;
        try {
            const retrieveDataObject = new retrieveData();
            let arrayOfData = await retrieveDataObject.getUserUploadedDatasets(this.userId)
            return response.status(200).send(arrayOfData);
        } catch (err) {
            response.status(500).send(err);
        }
    }

    async createRequestForUserFavorites(request: Request, response: Response) {
        let requestParams: any = { ...request.params };
        this.userId = requestParams;
        try {
            const retrieveDataObject = new retrieveData();
            let arrayOfData = await retrieveDataObject.getUserFavoritedDatasets(this.userId)
            return response.status(200).send(arrayOfData);
        } catch (err) {
            response.status(500).send(err);
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
            || (request.query.hasOwnProperty('firstName') && request.query.hasOwnProperty('lastName'))) { return true }
        else {
            return false
        }
    }
}