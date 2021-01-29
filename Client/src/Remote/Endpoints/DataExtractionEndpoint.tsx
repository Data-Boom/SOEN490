import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { post } from "../RemoteHelper"

const dataExtractionRoute = '/api/v1/dataExtract'

export const callDataExtract = async (formData: any): Promise<IDatasetModel> => {
  const result = await post(dataExtractionRoute, formData)
  return result
}