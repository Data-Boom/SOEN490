import { get, post, put } from "../RemoteHelper"

import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"

//todo validate list graph states works
const graphStateRoute = '/api/v1/graphState'

export const listGraphStates = async (): Promise<IGraphStateModel[]> => {
  const graphList = await get(graphStateRoute)
  return graphList
}

export const callGetGraphState = async (id: number): Promise<IGraphStateModel> => {
  const graphState = await get(graphStateRoute + '/' + id)
  return graphState
}

export const callCreateGraphState = async (graphState: IGraphStateModel): Promise<string> => {
  const createdStateId: string = await post(graphStateRoute, graphState)
  return createdStateId
}

export const callUpdateGraphState = async (graphState: IGraphStateModel): Promise<string> => {
  const createdStateId: string = await put(graphStateRoute, graphState)
  return createdStateId
}