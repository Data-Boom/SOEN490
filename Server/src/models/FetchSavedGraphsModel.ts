import { raw } from "express";
import { Connection, getConnection } from "typeorm";
import { selectOneSavedGraphQuery, selectSavedGraphsOfUserQuery } from "./entities/Savedgraphs";
import { IAxisModel, IDisplayedDatasetModel, IGraphStateModel } from "./interfaces/SavedGraphsInterface";

export class FetchSavedGraphsModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

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

    async getOneSavedGraph(graphId: number): Promise<IGraphStateModel> {
        let rawGraphData = await selectOneSavedGraphQuery(this.connection, graphId)
        let singleGraphData: IGraphStateModel = await this.processSavedGraphData(rawGraphData)
        return singleGraphData;
    }

    /**
     * This method will run a query find all the graphs favorited by a specific user ID
     * and return an array of IGraphStateModel containing that information. 
     * 
     * NOTE explain the loops 
     * 
     * @param id 
     * Account ID: number
     */
    async getSavedGraphsOfUser(userId: number): Promise<IGraphStateModel[]> {
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
}