import { GetRequestExecutor } from "../RequestExecutor/Implementation/GetRequestExecutor"
import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import { PostRequestExecutor } from "../RequestExecutor/Implementation/PostRequestExecutor"
import { PutRequestExecutor } from "../RequestExecutor/Implementation/PutRequestExecutor"

//todo validate list graph states works
const graphStateRoute = '/api/v1/graphState'

export const listGraphStates = async (): Promise<IGraphStateModel[]> => {
  const requestExecutor = new GetRequestExecutor(graphStateRoute)
  const result = await requestExecutor.execute()
  return result
}

export const callGetGraphState = async (id: number): Promise<IGraphStateModel> => {
  const requestExecutor = new GetRequestExecutor(graphStateRoute + '/' + id)
  const result = await requestExecutor.execute()
  return result
}

export const callCreateGraphState = async (graphState: IGraphStateModel): Promise<string> => {
  const requestExecutor = new PostRequestExecutor(graphStateRoute, graphState)
  const result = await requestExecutor.execute()
  return result
}

export const callUpdateGraphState = async (graphState: IGraphStateModel): Promise<string> => {
  const requestExecutor = new PutRequestExecutor(graphStateRoute, graphState)
  const result = await requestExecutor.execute()
  return result
}