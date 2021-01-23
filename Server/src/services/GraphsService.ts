import { GraphsModel } from '../models/GraphsModel';
import { IGraphStateModel } from "../models/interfaces/SavedGraphsInterface";
import { BadRequest, InternalServerError } from '@tsed/exceptions';
import { IResponse } from '../genericInterfaces/ResponsesInterface';


export class GraphsService {
    private dataQuery: GraphsModel;
    private requestResponse: IResponse

    constructor() {
        this.dataQuery = new GraphsModel();
        this.requestResponse = {} as any
    }

    /**
     * This method will accept a graph ID and will request and then return a IGraphStateModel object.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async fetchSingleSavedGraph(graphId: number) {
        try {
            let graphData = await this.dataQuery.fetchOneSavedGraph(graphId)
            if (graphData == undefined) {
                throw new BadRequest("Graph does not exist")
            }
            let singleGraphData: IGraphStateModel = await this.dataQuery.processSavedGraphData(graphData)
            this.requestResponse.statusCode = 200
            this.requestResponse.message = singleGraphData as any
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong fetching from DB. Maybe its down")
        }
    }

    /**
     * This method will accept a user ID and will request and then return an array of 
     * IGraphStateModel objects where each object contains a saved graph of the user.
     * 
     * @param userId 
     * User ID: number
     */
    async fetchUserSavedGraphsService(userID: number) {
        let userSavedGraphs = await this.dataQuery.fetchSavedGraphsOfUserModel(userID)
        return userSavedGraphs;
    }

    /**
     * This method will accept a graph ID and will request that this saved graph be deleted.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async addSavedGraphService(graph: IGraphStateModel, userEmail: string) {
        let status = await this.dataQuery.addSavedGraphModel(graph, userEmail)
        return status;
    }

    /**
     * This method will accept a graph ID and will request that this saved graph be deleted.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async deleteSavedGraphService(graphId: number) {
        let status = await this.dataQuery.deleteSavedGraphModel(graphId)
        return status;
    }
}