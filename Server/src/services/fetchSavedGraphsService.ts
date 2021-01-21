import { FetchSavedGraphsModel } from "../models/FetchSavedGraphsModel";
import { IGraphStateModel } from "../models/interfaces/SavedGraphsInterface";

export class fetchSavedGraphsService {
    private dataQuery: FetchSavedGraphsModel;
    constructor() {
        this.dataQuery = new FetchSavedGraphsModel();
    }

    async fetchOneSavedGraphService(graphId: number) {
        let oneGraph: IGraphStateModel = await this.dataQuery.getOneSavedGraph(graphId)
        return oneGraph;
    }

    async fetchUserSavedGraphsService(userId: number) {
        let userSavedGraphs: IGraphStateModel[] = await this.dataQuery.getSavedGraphsOfUser(userId)
        return userSavedGraphs;
    }
}