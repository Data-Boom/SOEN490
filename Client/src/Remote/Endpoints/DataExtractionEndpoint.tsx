import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { post } from "../RemoteHelper"

const dataExtractionRoute = '/api/v1/dataExtract'

export const callDataExtract = async (formData: FormData): Promise<IDatasetModel> => {
  const result = await post(dataExtractionRoute, { 'test': formData })
  return result
}