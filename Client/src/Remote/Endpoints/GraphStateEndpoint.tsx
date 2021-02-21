import { get, post, put, _delete } from "../FluentRequest"

import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"

//todo validate list graph states works
const graphStateRoute = '/api/v1/graphState'
const deleteGraphStateRoute = '/api/v1/graphState/:graphStateId'

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

export const callDeleteGraphState = async (graphState: IGraphStateModel, userID: number) => {
  const result = await _delete(graphStateRoute + '/' + graphState.id).withBody({ userID }).json()
  return result
}