import { Connection, getConnection } from "typeorm";
import { selectAccountIdFromEmailQuery } from "./entities/Accounts";
import { Savedgraphs, selectOneSavedGraphQuery, selectSavedGraphsOfUserQuery } from "./entities/Savedgraphs";
import { IAxisModel, IDisplayedDatasetModel, IGraphStateModel } from "./interfaces/SavedGraphsInterface";

export class savedGraphsModel {
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
    private async processSavedGraphData(rawGraphData: any): Promise<IGraphStateModel> {
        let singleGraphData: IGraphStateModel
        let oneDatasetsData: IDisplayedDatasetModel
        let sortedDatasetData: IDisplayedDatasetModel[] = []
        let oneAxisData: IAxisModel
        let sortedAxesData: IAxisModel[] = []
        rawGraphData.datasetIds = typeof rawGraphData.datasetIds === 'string' ? JSON.parse(rawGraphData.datasetIds) : []
        rawGraphData.datasetColors = typeof rawGraphData.datasetColors === 'string' ? JSON.parse(rawGraphData.datasetColors) : []
        rawGraphData.datasetShapes = typeof rawGraphData.datasetShapes === 'string' ? JSON.parse(rawGraphData.datasetShapes) : []
        rawGraphData.datasetHiddenStatus = typeof rawGraphData.datasetHiddenStatus === 'string' ? JSON.parse(rawGraphData.datasetHiddenStatus) : []
        rawGraphData.axisVariable = typeof rawGraphData.axisVariable === 'string' ? JSON.parse(rawGraphData.axisVariable) : []
        rawGraphData.axisMode = typeof rawGraphData.axisMode === 'string' ? JSON.parse(rawGraphData.axisMode) : []
        rawGraphData.axisZoom = typeof rawGraphData.axisZoom === 'string' ? JSON.parse(rawGraphData.axisZoom) : []
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
                mode: rawGraphData.axisMode[k],
                zoom: rawGraphData.axisZoom[k],
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
     * This method will run query to find the raw graph data of a specific graph, feed this raw
     * data to @processSavedGraphData to format it to fit the IGraphStateModel and then return
     * this object.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async fetchOneSavedGraphModel(graphId: number): Promise<IGraphStateModel> {
        let rawGraphData = await selectOneSavedGraphQuery(this.connection, graphId)
        let singleGraphData: IGraphStateModel = await this.processSavedGraphData(rawGraphData)
        return singleGraphData;
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
    async fetchSavedGraphsOfUserModel(userId: number): Promise<IGraphStateModel[]> {
        let rawGraphData = await selectSavedGraphsOfUserQuery(this.connection, userId)
        console.log(rawGraphData)
        let singleGraphData: IGraphStateModel
        let sortedGraphData: IGraphStateModel[] = []
        for (let index = 0; index < rawGraphData.length; index++) {
            singleGraphData = await this.processSavedGraphData(rawGraphData[index])
            sortedGraphData.push(singleGraphData)
        }
        return sortedGraphData;
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
     * @param axisMode 
     * Axis mode: string[]
     * @param axisZoom 
     * Axis zoom index: number[]
     * @param axisUnits 
     * Axis unit types: string[]
     */
    private async sendSavedGraphToDatabase(accountId: number, name: string, datasetIds: number[], datasetColors: string[], datasetShapes: string[], datasetHiddenStatus: boolean[],
        axisVariable: string[], axisMode: string[], axisZoom: number[], axisUnits: string[]): Promise<string> {
        let newGraph = new Savedgraphs();
        newGraph.id;
        newGraph.accountId = accountId;
        newGraph.name = name;
        newGraph.datasetIds = datasetIds;
        newGraph.datasetColors = datasetColors;
        newGraph.datasetShapes = datasetShapes;
        newGraph.datasetHiddenStatus = datasetHiddenStatus;
        newGraph.axisVariable = axisVariable;
        newGraph.axisMode = axisMode;
        newGraph.axisZoom = axisZoom;
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
    async addSavedGraphModel(graph: IGraphStateModel, userEmail: string): Promise<any[]> {
        let userRawData = await selectAccountIdFromEmailQuery(this.connection, userEmail)
        if (userRawData == undefined)
            return [false, "Invalid user email provided"]
        else {
            let datasetIds: number[] = []
            let datasetColors: string[] = []
            let datasetShapes: string[] = []
            let datasetHiddenStatus: boolean[] = []
            let axisVariable: string[] = []
            let axisMode: string[] = []
            let axisZoom: number[] = []
            let axisUnits: string[] = []
            for (let j = 0; j < graph.datasets.length; j++) {
                datasetIds.push(graph.datasets[j].id)
                datasetColors.push(graph.datasets[j].color)
                datasetShapes.push(graph.datasets[j].shape)
                datasetHiddenStatus.push(graph.datasets[j].isHidden)
            }
            for (let k = 0; k < graph.axes.length; k++) {
                axisVariable.push(graph.axes[k].variableName)
                axisMode.push(graph.axes[k].mode)
                axisZoom.push(graph.axes[k].zoom)
                axisUnits.push(graph.axes[k].units)
            }
            let statusMessage = await this.sendSavedGraphToDatabase(userRawData.id, graph.name, datasetIds, datasetColors, datasetShapes, datasetHiddenStatus, axisVariable, axisMode, axisZoom, axisUnits)
            return [true, statusMessage]
        }
    }

    private deleteSavedGraphQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Savedgraphs)
            .where("id = :id", { id: id })
            .execute();

    /**
     * This method will run a query to delete the specficied saved graph.
     * 
     * @param graphId 
     * Graph ID: number
     */
    async deleteSavedGraphModel(graphId: number): Promise<string> {
        await this.deleteSavedGraphQuery(graphId);
        return "Saved graph deletion was successful"
    }

}