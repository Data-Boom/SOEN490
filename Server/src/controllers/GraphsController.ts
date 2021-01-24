import { Request, Response } from 'express';
import { IGraphStateModel } from '../models/interfaces/SavedGraphsInterface';
import { GraphsService } from '../services/GraphsService';

export class GraphsController {
    private savedGraphsService: GraphsService;
    constructor() {
    }

    /**
     * This controller will take a request, send it to the savedGraphsService to acquire a 
     * IGraphStateModel object containing a single saved graph.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForSingleSavedGraph(request: Request, response: Response) {
        let requestParam = request.params.oneSavedGraph;
        console.log(request.body)
        let graphId: number = +requestParam;
        if (isNaN(graphId)) {
            response.status(400).json("Invalid graph ID entered");
        }
        else {
            try {
                this.savedGraphsService = new GraphsService();
                let requestResponse: any = await this.savedGraphsService.fetchSingleSavedGraph(graphId)
                response.status(requestResponse.statusCode).json(requestResponse.message)
            } catch (error) {
                response.status(error.status).json(error.message);
            }
        }
    }

    /**
     * This controller will take a request, send it to the savedGraphsService to acquire an 
     * array of IGraphStateModel objects where each object is a saved graph of the specified user.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForUserSavedGraphs(request: Request, response: Response) {
        let userId = request.body.user.account_id
        try {
            this.savedGraphsService = new GraphsService();
            let requestResponse = await this.savedGraphsService.fetchUserSavedGraphs(userId)
            response.status(requestResponse.statusCode).json(requestResponse.message)
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }

    /**
     * This controller will take a request, send it to the savedGraphsService to acquire an 
     * array of IGraphStateModel objects where each object is a saved graph of the specified user.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForAddingSavedGraph(request: Request, response: Response) {
        let requestParams: any = { ...request.body };
        let processedRequest: IGraphStateModel = requestParams;
        let userId = request.body.user.account_id
        try {
            this.savedGraphsService = new GraphsService();
            let requestResponse = await this.savedGraphsService.saveNewGraph(processedRequest, userId)
            response.status(requestResponse.statusCode).json(requestResponse.message)
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }

    /**
     * This controller will take a request, send it to the savedGraphsService to acquire an 
     * array of IGraphStateModel objects where each object is a saved graph of the specified user.
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForDeletingSavedGraph(request: Request, response: Response) {
        let requestParam = request.params.deleteSavedGraph;
        let graphId: number = +requestParam;
        if (isNaN(graphId)) {
            response.status(400).json("Invalid graph ID entered");
        }
        else {
            try {
                this.savedGraphsService = new GraphsService();
                let requestResponse = await this.savedGraphsService.deleteSavedGraph(graphId)
                response.status(requestResponse.statusCode).json(requestResponse.message)
            } catch (error) {
                response.status(error.status).json(error.message);
            }
        }
    }
}