import { get, post, put } from "../FluentRequest"

import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"

//todo validate list graph states works
const graphStateRoute = '/api/v1/graphState'

export const listGraphStates = async (): Promise<IGraphStateModel[]> => {
  const result: IGraphStateModel[] = await get(graphStateRoute).json()
  return result
}

export const callGetGraphState = async (id: number): Promise<IGraphStateModel> => {
  const result: IGraphStateModel = await get(graphStateRoute + '/' + id).json()
  return result
}

export const callCreateGraphState = async (graphState: IGraphStateModel): Promise<string> => {
  const result = await post(graphStateRoute).withBody(graphState).json()
  return result
}

export const callUpdateGraphState = async (graphState: IGraphStateModel): Promise<string> => {
  const result = await put(graphStateRoute).withBody(graphState).json()
  return result
}