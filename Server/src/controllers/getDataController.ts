import { retrieveData } from '../services/getDataService';
import { IDataRequestModel } from "../models/interfaces/DataRequestModelInterface";

export class getDataController {
    async createRequestForData(request: Request, response: Response) {
        let validatedData = this.validateInputData(request, response);
        if (validatedData != false) {
            try {
                const retrieveDataObject = new retrieveData();
                let arrayOfData = await retrieveDataObject.getArrayOfDatasets(validatedData)
                return response.status(200).send(arrayOfData);
            } catch (err) {
                response.status(500).send(err);
            }
        }
        else {
            response.status(500).send("Invalid search params entered");
        }
    }

    private validateInputData(request: Request, response: Response) {
        let validatedRequest: IDataRequestModel;
        validatedRequest = request.query;
        if (validatedRequest.datasetId != undefined && validatedRequest.material != undefined
            && validatedRequest.year != undefined && validatedRequest.categoryId != undefined
            && (validatedRequest.firstName != undefined || validatedRequest.lastName != undefined))
            return false;
        return validatedRequest
    }
}