import { Request, Response } from 'express';
import { IGraphStateModel } from '../models/interfaces/SavedGraphsInterface';
import { savedGraphsService } from '../services/savedGraphsService';

export class savedGraphsController {
    private savedGraphsService: savedGraphsService;
    constructor() {
        this.savedGraphsService = new savedGraphsService();
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
    async createRequestForOneSavedGraph(request: Request, response: Response) {
        let requestParam = request.params.oneSavedGraph;
        let graphId: number = +requestParam;
        if (isNaN(graphId)) {
            response.status(400).json("Invalid graph ID entered");
        }
        else {
            try {
                let oneGraph = await this.savedGraphsService.fetchOneSavedGraphService(graphId)
                return response.status(200).json(oneGraph);
            } catch (err) {
                response.status(500).json(err);
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
        let requestParam = request.params.userSavedGraphs;
        let userId: number = +requestParam;
        if (isNaN(userId)) {
            response.status(400).json("Invalid user ID entered");
        }
        else {
            try {
                let userSavedGraphs = await this.savedGraphsService.fetchUserSavedGraphsService(userId)
                return response.status(200).json(userSavedGraphs);
            } catch (err) {
                response.status(500).json(err);
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
    async createRequestForAddingSavedGraph(request: Request, response: Response) {
        let requestParams: any = { ...request.body };
        let processedRequest: IGraphStateModel = requestParams;
        let userEmail = request.body.email;
        try {
            let executionStatus = await this.savedGraphsService.addSavedGraphService(processedRequest, userEmail)
            if (executionStatus[0]) { return response.status(200).json(executionStatus[1]); }
            else { return response.status(400).json(executionStatus[1]); }
        } catch (err) {
            response.status(500).json(err);
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
                let executionResult = await this.savedGraphsService.deleteSavedGraphService(graphId)
                return response.status(200).json(executionResult);
            } catch (err) {
                response.status(500).json(err);
            }
        }
    }
}