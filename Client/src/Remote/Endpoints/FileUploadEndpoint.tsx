import { IRemoteDatasetModel, toLocalDatasetModel, toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { post } from "../FluentRequest"

const dataExtractRoute = '/api/v1/dataExtract'

export const extractDatasetFromFile = async (file: File): Promise<IDatasetModel> => {
  const result: IRemoteDatasetModel = await post(dataExtractRoute).withFile(file).json()
  const localDataset = toLocalDatasetModel(result)
  return localDataset
}