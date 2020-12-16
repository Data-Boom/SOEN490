import { retrieveData } from '../services/getDataService';
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";

export class getDataController {
    async createRequestForData(request: Request, response: Response) {
        let validatedData = this.validateInputData(request, response);
        try {
            const retrieveDataObject = new retrieveData();
            let arrayOfData = await retrieveDataObject.getArrayOfDatasets(validatedData)
            return response.status(200).send(arrayOfData);
        } catch (err) {
            response.status(500).send(err);
        }
    }

    private validateInputData(request: Request, response: Response) {
        let validatedRequest: IDataRequestModel;
        validatedRequest = request.query;
        if (validatedRequest.datasetId != undefined && validatedRequest.material.length > 0
            && validatedRequest.year != undefined && validatedRequest.categoryId != undefined
            && (validatedRequest.firstName != undefined || validatedRequest.lastName != undefined))
            response.status(500).send("Invalid search params entered");
        return validatedRequest
    }
}