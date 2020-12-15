import { Request, Response } from 'express';
import { retrieveData } from '../services/getDataService';
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";

export class getDataController {
    private validatedRequest: IDataRequestModel;
    constructor() {
    }
    async createRequestForData(request: Request, response: Response) {
        let validateData = this.validateInputData(request)
        console.log(validateData)
        if (!validateData) {
            response.status(500).send("Invalid search params entered");
        }
        else {
            this.validatedRequest = {} as any;
            this.validatedRequest.datasetId = request.query.datasetId as any[];
            this.validatedRequest.material = request.query.material as string[];
            this.validatedRequest.year = request.query.year as any;
            this.validatedRequest.firstName = request.query.firstName as string;
            this.validatedRequest.lastName = request.query.lastName as string;
            this.validatedRequest.categoryId = request.query.categoryId as any;
            this.validatedRequest.subcategoryId = request.query.datasetId as any;
            try {
                const retrieveDataObject = new retrieveData();
                let arrayOfData = await retrieveDataObject.getArrayOfDatasets(this.validatedRequest)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(500).send(err);
            }
        }
    }

    private validateInputData(request: Request) {
        if (request.query.hasOwnProperty('datasetId') || request.query.hasOwnProperty('material')
            || request.query.hasOwnProperty('year') || request.query.hasOwnProperty('categoryId')
            || (request.query.hasOwnProperty('firstName') && request.query.hasOwnProperty('lastName'))) { return true }
        else {
            return false
        }
    }
}