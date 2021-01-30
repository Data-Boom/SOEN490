import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { post } from "../FluentRequest"

const dataExtractRoute = '/api/v1/dataExtract'

export const extractDatasetFromFile = async (file: File): Promise<IDatasetModel> => {
  const result: IDatasetModel = await post(dataExtractRoute).withFile(file).json()
  return result
}