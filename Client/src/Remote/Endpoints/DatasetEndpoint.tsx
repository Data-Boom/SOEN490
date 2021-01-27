import { IRemoteDatasetModel, toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import { get } from "../RemoteHelper"
import { stringify } from "query-string"

const userUploadedDatasetsRoute = '/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/api/v1/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/api/v1/dataset*'

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const remoteDatasets: IRemoteDatasetModel[] = await get(datasetRoute, stringify(query, { arrayFormat: 'bracket' }))
  const localDatasets = toLocalDatasets(remoteDatasets)
  return localDatasets
}