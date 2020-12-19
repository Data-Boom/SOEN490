import { Request, Response } from 'express';
import { retrieveBasicData } from '../services/getBasicDataService';

export class getBasicDataController {
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
    async createRequestForAllCategories(request: Request, response: Response) {
        try {
            const retrieveBasicDataObject = new retrieveBasicData();
            let arrayOfData = await retrieveBasicDataObject.getBasicCategoryData()
            return response.status(200).send(arrayOfData);
        } catch (err) {
            response.status(500).send(err);
        }
    }

    async createRequestForAllSubcategories(request: Request, response: Response) {
        try {
            const retrieveBasicDataObject = new retrieveBasicData();
            let arrayOfData = await retrieveBasicDataObject.getBasicSubcategoryData()
            return response.status(200).send(arrayOfData);
        } catch (err) {
            response.status(500).send(err);
        }
    }

    async createRequestForAllMaterials(request: Request, response: Response) {
        try {
            const retrieveBasicDataObject = new retrieveBasicData();
            let arrayOfData = await retrieveBasicDataObject.getBasicMaterialData()
            return response.status(200).send(arrayOfData);
        } catch (err) {
            response.status(500).send(err);
        }
    }
}