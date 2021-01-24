import { get, post } from "../RemoteHelper"

import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"

const getGraphStateRoute = '/api/v1/savedGraphs/oneSavedGraph/'
const addGraphStateRoute = '/api/v1/addSavedGraph'
const listGraphStatesRoute = '/api/v1/userSavedGraphs'
const deleteGraphStateRoute = '/api/v1/deleteSavedGraph/:deleteSavedGraph'

export const listGraphStates = async (): Promise<IGraphStateModel[]> => {
  const graphList = await get(listGraphStatesRoute)
  return graphList
}

export const getGraphState = async (id: number): Promise<IGraphStateModel> => {
  const graphState = await get(getGraphStateRoute + id)
  return graphState
}

export const callCreateGraphState = async (graphState: IGraphStateModel): Promise<string> => {
  const createdStateId: string = await post(addGraphStateRoute, graphState)
  return createdStateId
}