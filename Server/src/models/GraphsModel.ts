import { Connection, getConnection } from "typeorm";
import { BadRequest } from '@tsed/exceptions';
import { Accounts } from "./entities/Accounts";
import { Graphstate, selectGraphOwnerQuery, selectGraphStateQuery } from "./entities/Graphstate";
import { IAxisModel, IDisplayedDatasetModel, IGraphStateModel } from "./interfaces/GraphStateInterface";

export class GraphsModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    /**
     * This method accepts a raw data packet containing all of a saved graph's data. It will first
     * process the various arrays of the data packet to allow for proper processing. Secondly it
     * will loop through the collection of dataset and axis arrays to process them. Lastly it will
     * combine all this information into a IGraphStateModel object and return it. 
     * 
     * @param rawGraphData 
     * Raw data packet: JSON object
     */
    async processSavedGraphData(rawGraphData: any): Promise<IGraphStateModel> {
        let singleGraphData: IGraphStateModel
        let oneDatasetsData: IDisplayedDatasetModel
        let sortedDatasetData: IDisplayedDatasetModel[] = []
        let oneAxisData: IAxisModel
        let sortedAxesData: IAxisModel[] = []
        rawGraphData.datasetIds = typeof rawGraphData.datasetIds == 'string' ? JSON.parse(rawGraphData.datasetIds) : []
        rawGraphData.datasetColors = typeof rawGraphData.datasetColors === 'string' ? JSON.parse(rawGraphData.datasetColors) : []
        rawGraphData.datasetShapes = typeof rawGraphData.datasetShapes === 'string' ? JSON.parse(rawGraphData.datasetShapes) : []
        rawGraphData.datasetHiddenStatus = typeof rawGraphData.datasetHiddenStatus === 'string' ? JSON.parse(rawGraphData.datasetHiddenStatus) : []
        rawGraphData.axisVariable = typeof rawGraphData.axisVariable === 'string' ? JSON.parse(rawGraphData.axisVariable) : []
        rawGraphData.axisLog = typeof rawGraphData.axisLog === 'string' ? JSON.parse(rawGraphData.axisLog) : []
        rawGraphData.axisZoomStart = typeof rawGraphData.axisZoomStart === 'string' ? JSON.parse(rawGraphData.axisZoomStart) : []
        rawGraphData.axisZoomEnd = typeof rawGraphData.axisZoomEnd === 'string' ? JSON.parse(rawGraphData.axisZoomEnd) : []
        rawGraphData.axisUnits = typeof rawGraphData.axisUnits === 'string' ? JSON.parse(rawGraphData.axisUnits) : []
        for (let j = 0; j < rawGraphData.datasetIds.length; j++) {
            oneDatasetsData = {
                id: rawGraphData.datasetIds[j],
                color: rawGraphData.datasetColors[j],
                shape: rawGraphData.datasetShapes[j],
                isHidden: rawGraphData.datasetHiddenStatus[j]
            }
            sortedDatasetData.push(oneDatasetsData)
        }
        for (let k = 0; k < rawGraphData.axisVariable.length; k++) {
            oneAxisData = {
                variableName: rawGraphData.axisVariable[k],
                logarithmic: rawGraphData.axisLog[k],
                zoomStartIndex: rawGraphData.axisZoomStart[k],
                zoomEndIndex: rawGraphData.axisZoomEnd[k],
                units: rawGraphData.axisUnits[k]
            }
            sortedAxesData.push(oneAxisData)
        }
        singleGraphData = {
            datasets: sortedDatasetData,
            name: rawGraphData.name,
            axes: sortedAxesData,
            id: rawGraphData.id
        }
        return singleGraphData
    }

    /**
     * This method will run query to find and then return the raw graph data of a specific graph.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async fetchSingleSavedGraphFromDB(graphId: number): Promise<any> {
        let rawGraphData = await selectGraphStateQuery(this.connection)
            .where('graphs.id = :id', { id: graphId })
            .getRawOne();
        return rawGraphData
    }

    /**
     * This method will run a query find all the raw graph data favorited by a specific user ID,
     * feed each individual graph's raw data to @processSavedGraphData to format it to fit the
     * IGraphStateModel, push this IGraphStateModel object to an array of IGraphStateModel objects,
     * and then return this array. 
     * 
     * @param id 
     * Account ID: number
     */
    async fetchSavedGraphs(userId: number): Promise<any[]> {
        let rawGraphData = await selectGraphStateQuery(this.connection)
            .innerJoin(Accounts, 'accounts', 'graphs.accountId = accounts.id')
            .where('accounts.id = :user', { user: userId })
            .getRawMany();
        let singleGraphData: IGraphStateModel
        let sortedGraphData: IGraphStateModel[] = []
        for (let index = 0; index < rawGraphData.length; index++) {
            singleGraphData = await this.processSavedGraphData(rawGraphData[index])
            sortedGraphData.push(singleGraphData)
        }
        console.log(sortedGraphData)
        console.log(sortedGraphData.length)
        return sortedGraphData
    }

    private async processGraphInput(graph: IGraphStateModel): Promise<any[]> {
        let datasetIds: number[] = []
        let datasetColors: string[] = []
        let datasetShapes: string[] = []
        let datasetHiddenStatus: boolean[] = []
        let axisVariable: string[] = []
        let axisLog: boolean[] = []
        let axisZoomStart: number[] = []
        let axisZoomEnd: number[] = []
        let axisUnits: string[] = []
        for (let j = 0; j < graph.datasets.length; j++) {
            datasetIds.push(graph.datasets[j].id)
            datasetColors.push(graph.datasets[j].color)
            datasetShapes.push(graph.datasets[j].shape)
            datasetHiddenStatus.push(graph.datasets[j].isHidden)
        }
        for (let k = 0; k < graph.axes.length; k++) {
            axisVariable.push(graph.axes[k].variableName)
            axisLog.push(graph.axes[k].logarithmic)
            axisZoomStart.push(graph.axes[k].zoomStartIndex)
            axisZoomEnd.push(graph.axes[k].zoomEndIndex)
            axisUnits.push(graph.axes[k].units)
        }
        let processedData = [graph.id, graph.name, datasetIds, datasetColors, datasetShapes,
            datasetHiddenStatus, axisVariable, axisLog, axisZoomStart, axisZoomEnd, axisUnits]
        return processedData
    }

    /**
     * This method will accept all the variables of a saved graph and add it to the Savedgraphs table.
     * 
     * @param accountId 
     * Account ID: number
     * @param name 
     * Graph name: string
     * @param datasetIds 
     * Data Set ID array: number[]
     * @param datasetColors 
     * Colors of the Data Set lines: string[]
     * @param datasetShapes 
     * Shapes of the Data Set lines: string[]
     * @param datasetHiddenStatus 
     * Flag for if a Data Set is hidden: boolean[]
     * @param axisVariable 
     * Axis variables names: string[]
     * @param axisLog 
     * If axis is logarithmic: boolean[]
     * @param axisZoomStart
     * Axis zoom start index: number[]
     * @param axisZoomEnd
     * Axis zoom end index: number[]
     * @param axisUnits 
     * Axis unit types: string[]
     */
    private async sendSavedGraphToDatabase(accountId: number, name: string, datasetIds: number[], datasetColors: string[], datasetShapes: string[],
        datasetHiddenStatus: boolean[], axisVariable: string[], axisLog: boolean[], axisZoomStart: number[], axisZoomEnd: number[],
        axisUnits: string[]): Promise<string> {
        let newGraph = new Graphstate();
        newGraph.id;
        newGraph.accountId = accountId;
        newGraph.name = name;
        newGraph.datasetIds = datasetIds;
        newGraph.datasetColors = datasetColors;
        newGraph.datasetShapes = datasetShapes;
        newGraph.datasetHiddenStatus = datasetHiddenStatus;
        newGraph.axisVariable = axisVariable;
        newGraph.axisLog = axisLog;
        newGraph.axisZoomStart = axisZoomStart;
        newGraph.axisZoomEnd = axisZoomEnd;
        newGraph.axisUnits = axisUnits;
        await this.connection.manager.save(newGraph);
        return "Graph successfully saved"
    }

    /**
     * This method will take a user's email and a IGraphStateModel object. It will first get the user's
     * ID through a query, return an error if the email is invalid, and if not will proceed to parse
     * through the IGraphStateModel object to format the encapsulated datasets and axes objects into
     * arrays ready for insertion into the Savedgraphs table. After, it will send these arrays,
     * the user's ID, and the name of the graph to @sendSavedGraphToDatabase for insertion into the table.
     * 
     * @param graph 
     * Full graph information: IGraphStateModel
     * @param userEmail 
     * User email address: string
     */
    async saveGraph(graph: IGraphStateModel, userId: number): Promise<string> {
        let processGraphInput = await this.processGraphInput(graph)
        let statusMessage = await this.sendSavedGraphToDatabase(userId, processGraphInput[1], processGraphInput[2], processGraphInput[3], processGraphInput[4],
            processGraphInput[5], processGraphInput[6], processGraphInput[7], processGraphInput[8], processGraphInput[9], processGraphInput[10])
        return statusMessage
    }

    private updateGraphQuery = (graphId: number, graphName: string, datasetIds: number[], datasetColors: string[], datasetShapes: string[],
        datasetHiddenStatus: boolean[], axisVariable: string[], axisLog: boolean[], axisZoomStart: number[], axisZoomEnd: number[], axisUnits: string[]) =>
        this.connection.createQueryBuilder()
            .update(Graphstate)
            .set({
                name: graphName, datasetIds: datasetIds,
                datasetColors: datasetColors, datasetShapes: datasetShapes,
                datasetHiddenStatus: datasetHiddenStatus,
                axisVariable: axisVariable, axisLog: axisLog,
                axisZoomStart: axisZoomStart, axisZoomEnd: axisZoomEnd,
                axisUnits: axisUnits
            })
            .where("id = :id", { id: graphId })
            .execute();

    async verifyGraphOwner(graphId: number, userId: number): Promise<any> {
        let graphOwner = await selectGraphOwnerQuery(this.connection, graphId)
        if (graphOwner == undefined) {
            return "Graph does not exist"
        }
        else if (graphOwner.accountId !== userId) {
            return "This is not your graph!"
        }
        else {
            return true
        }
    }

    async updateGraph(graph: IGraphStateModel): Promise<string> {
        let processGraphInput = await this.processGraphInput(graph)
        await this.updateGraphQuery(processGraphInput[0],
            processGraphInput[1], processGraphInput[2],
            processGraphInput[3], processGraphInput[4],
            processGraphInput[5], processGraphInput[6],
            processGraphInput[7], processGraphInput[8],
            processGraphInput[9], processGraphInput[10])
        return "Graph successfully updated"
    }

    private deleteGraphQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Graphstate)
            .where("id = :id", { id: id })
            .execute();

    /**
     * This method will run a query to delete the specficied saved graph.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async deleteGraph(graphId: number): Promise<string> {
        await this.deleteGraphQuery(graphId);
        return "Graph successfully deleted"
    }

}