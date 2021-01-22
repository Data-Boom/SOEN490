import { FetchSavedGraphsModel } from "../models/FetchSavedGraphsModel";
import { IGraphStateModel } from "../models/interfaces/SavedGraphsInterface";

export class fetchSavedGraphsService {
    private dataQuery: FetchSavedGraphsModel;
    constructor() {
        this.dataQuery = new FetchSavedGraphsModel();
    }

    /**
     * This method will accept a graph ID and will request and then return a IGraphStateModel object.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async fetchOneSavedGraphService(graphId: number) {
        let oneGraph: IGraphStateModel = await this.dataQuery.fetchOneSavedGraphModel(graphId)
        return oneGraph;
    }

    /**
     * This method will accept a user ID and will request and then return an array of 
     * IGraphStateModel objects where each object contains a saved graph of the user.
     * 
     * @param userId 
     * User ID: number
     */
    async fetchUserSavedGraphsService(userId: number) {
        let userSavedGraphs: IGraphStateModel[] = await this.dataQuery.fetchSavedGraphsOfUserModel(userId)
        return userSavedGraphs;
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