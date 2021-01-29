import { IRemoteDatasetModel, toLocalDatasetModel, toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

import { FileUploadRequestExecutor } from "../RequestExecutor/Implementation/FileUploadRequestExecutor"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"

const dataExtractRoute = '/api/v1/dataExtract'

export const extractDatasetFromFile = async (file: File): Promise<IDatasetModel> => {
  const requestExecutor = new FileUploadRequestExecutor(dataExtractRoute, file)
  const remoteDatasets: IRemoteDatasetModel = await requestExecutor.execute()
  const localDataset = toLocalDatasetModel(remoteDatasets)
  return localDataset
}