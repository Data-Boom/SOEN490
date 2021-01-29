import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { PostRequestExecutor } from "../RequestExecutor/Implementation/PostRequestExecutor"

const dataExtractionRoute = '/api/v1/dataExtract'

export const callDataExtract = async (formData: any): Promise<IDatasetModel> => {
  const requestExecutor = new PostRequestExecutor(dataExtractionRoute, formData)
  const result = await requestExecutor.execute()
  return result
}