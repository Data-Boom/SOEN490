import { GraphsModel } from '../models/GraphsModel';
import { IGraphStateModel } from "../models/interfaces/GraphStateInterface";
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
     * This method will accept a graph ID and will request a graphs's raw data and feed this raw
     * data to @processSavedGraphData to format it to fit the IGraphStateModel and then return
     * this object, if the graph exists. If the graph does not exist, it will throw an error.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async fetchSingleSavedGraph(graphId: number) {
        try {
            let graphData = await this.dataQuery.fetchSingleSavedGraphFromDB(graphId)
            if (graphData == undefined) {
                throw new BadRequest("Graph does not exist")
            }
            let singleGraphData: IGraphStateModel = await this.dataQuery.processSavedGraphData(graphData)
            this.requestResponse.statusCode = 200
            this.requestResponse.message = singleGraphData as any
            return this.requestResponse
        } catch (error) {
            if (error instanceof BadRequest) {
                throw new BadRequest(error.message)
            }
            else {
                throw new InternalServerError("Something went wrong fetching from DB. Maybe its down")
            }
        }
    }

    /**
     * This method will accept a user ID and will request and then return an array of 
     * IGraphStateModel objects where each object contains a saved graph of the user.
     * 
     * @param userId 
     * User ID: number
     */
    async fetchUserSavedGraphs(userID: number) {
        try {
            let graphData = await this.dataQuery.fetchSavedGraphs(userID)
            if (graphData.length == 0) {
                this.requestResponse.statusCode = 200
                this.requestResponse.message = "You don't have any saved graphs!"
                return this.requestResponse
            }
            this.requestResponse.statusCode = 200
            this.requestResponse.message = graphData as any
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong fetching from DB. Maybe its down")
        }
    }

    async updateExistingGraph(graph: IGraphStateModel, userId: number) {
        let ownerVerification = await this.dataQuery.verifyGraphOwner(Number(graph.id), userId)
        if (ownerVerification == true) {
            try {
                let status = await this.dataQuery.updateGraph(graph)
                this.requestResponse.statusCode = 200
                this.requestResponse.message = status
                return this.requestResponse
            } catch (error) {
                throw new InternalServerError("Something went wrong fetching from DB. Maybe its down")
            }
        }
        else {
            throw new BadRequest(ownerVerification)
        }
    }

    /**
     * This method will accept a IGraphStateModel object and a userId and will request that this 
     * graph state be saved
     * 
     * @param graph
     * Graph: IGraphStateModel
     * @param userId
     * User's ID: number
     */
    async saveNewGraph(graph: IGraphStateModel, userId: number) {
        try {
            let status = await this.dataQuery.saveGraph(graph, userId)
            this.requestResponse.statusCode = 201
            this.requestResponse.message = status
            return this.requestResponse
        } catch (error) {
            throw new InternalServerError("Something went wrong fetching from DB. Maybe its down")
        }
    }

    /**
     * This method will accept a graph ID and will request that this saved graph be deleted.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async deleteSavedGraph(graphId: number, userId: number) {
        let ownerVerification = await this.dataQuery.verifyGraphOwner(graphId, userId)
        if (ownerVerification == true) {
            try {
                let status = await this.dataQuery.deleteGraph(graphId)
                this.requestResponse.statusCode = 200
                this.requestResponse.message = status
                return this.requestResponse
            } catch (error) {
                throw new InternalServerError("Something went wrong fetching from DB. Maybe its down")
            }
        }
        else {
            throw new BadRequest(ownerVerification)
        }
    }
}