import { Request, Response } from 'express';
import { retrieveBasicData } from '../services/getBasicDataService';

export class getBasicDataController {
    private retrieveBasicDataObject = new retrieveBasicData();
    constructor() {
    }

    /**
     * This controller will take a request, send it to the getDataService to acquire an array 
     * containing the names and IDs all of the categories in the database
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForAllCategories(request: Request, response: Response) {
        let arrayOfData = await this.retrieveBasicDataObject.getBasicCategoryDataService()
        return response.status(200).send(arrayOfData);
    }

    /**
     * This controller will take a request, send it to the getDataService to acquire an array 
     * containing the names and IDs all of the subcategories in the database
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForAllSubcategories(request: Request, response: Response) {
        let arrayOfData = await this.retrieveBasicDataObject.getBasicSubcategoryDataService()
        return response.status(200).send(arrayOfData);
    }

    /**
     * This controller will take a request, send it to the getDataService to acquire an array 
     * containing the names and IDs all of the materials in the database
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForAllMaterials(request: Request, response: Response) {
        let arrayOfData = await this.retrieveBasicDataObject.getBasicMaterialDataService()
        return response.status(200).send(arrayOfData);
    }
}