import { Request, Response } from 'express';
import { FetchAllMaterialsService } from '../services/FetchAllMaterialsService';

export class FetchAllMaterialsController {
    private FetchAllMaterialsService: FetchAllMaterialsService;
    constructor() {
        this.FetchAllMaterialsService = new FetchAllMaterialsService();
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
        try {
            let arrayOfData = await this.FetchAllMaterialsService.fetchAllMaterialDataService()
            return response.status(200).json(arrayOfData);
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }
}