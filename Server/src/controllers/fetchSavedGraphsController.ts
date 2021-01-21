import { Request, Response } from 'express';
import { fetchSavedGraphsService } from '../services/fetchSavedGraphsService';

export class fetchSavedGraphsController {
    private fetchSavedGraphsService: fetchSavedGraphsService;
    constructor() {
        this.fetchSavedGraphsService = new fetchSavedGraphsService();
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
    async createRequestForOneSavedGraph(request: Request, response: Response) {
        let requestParam = request.params.oneSavedGraph;
        let graphId: number = +requestParam;
        if (isNaN(graphId)) {
            response.status(400).send("Invalid graph ID entered");
        }
        else {
            try {
                let oneGraph = await this.fetchSavedGraphsService.fetchOneSavedGraphService(graphId)
                return response.status(200).send(oneGraph);
            } catch (err) {
                response.status(500).send(err);
            }
        }
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
    async createRequestForUserSavedGraphs(request: Request, response: Response) {
        let requestParam = request.params.userSavedGraphs;
        let userId: number = +requestParam;
        if (isNaN(userId)) {
            response.status(400).send("Invalid user ID entered");
        }
        else {
            try {
                let userSavedGraphs = await this.fetchSavedGraphsService.fetchUserSavedGraphsService(userId)
                return response.status(200).send(userSavedGraphs);
            } catch (err) {
                response.status(500).send(err);
            }
        }
    }
}