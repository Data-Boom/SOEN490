import { Connection, getConnection } from "typeorm";
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
                zoom: rawGraphData.axisZoom[k]
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
    async deleteSavedGraphModel(graphId: number) {
        await this.deleteSavedGraphQuery(graphId);
        return "Saved graph deletion was successful"
    }

}