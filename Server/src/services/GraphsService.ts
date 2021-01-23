import { GraphsModel } from '../models/GraphModel';
import { IGraphStateModel } from "../models/interfaces/SavedGraphsInterface";
import { InternalServerError } from '@tsed/exceptions';

export class GraphsService {
    private dataQuery: GraphsModel;
    constructor() {
        this.dataQuery = new GraphsModel();
    }

    /**
     * This method will accept a graph ID and will request and then return a IGraphStateModel object.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async fetchSingleSavedGraph(graphId: number) {
        try {
            let oneGraph = await this.dataQuery.fetchOneSavedGraph(graphId)
            return oneGraph;
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