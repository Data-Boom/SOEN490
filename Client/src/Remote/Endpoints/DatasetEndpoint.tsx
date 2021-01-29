import { IRemoteDatasetModel, toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

import { GetRequestExecutor } from "../RequestExecutor/Implementation/GetRequestExecutor"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"

const userUploadedDatasetsRoute = '/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/api/v1/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/api/v1/dataset*'

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const requestExecutor = new GetRequestExecutor(datasetRoute, query)
  const remoteDatasets: IRemoteDatasetModel[] = await requestExecutor.execute()
  const localDatasets = toLocalDatasets(remoteDatasets)
  return localDatasets
}