import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import { get } from "../RemoteHelper"

const getGraphStateRoute = '/api/v1/savedGraphs/oneSavedGraph/:oneSavedGraph'
const addGraphStateRoute = '/api/v1/addSavedGraph'
const listGraphStatesRoute = '/api/v1/userSavedGraphs'
const deleteGraphStateRoute = '/api/v1/deleteSavedGraph/:deleteSavedGraph'

export const listGraphStates = async (): Promise<IGraphStateModel[]> => {
  const graphList = await get(listGraphStatesRoute)
  return graphList
}

export const getGraphState = async (id: number): Promise<IGraphStateModel> => {
  const graphState = await get(listGraphStatesRoute)
  return graphState
}