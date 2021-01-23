import { IRemoteDatasetModel, toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import { get } from "../RemoteHelper"
import { stringify } from "query-string"

const userUploadedDatasetsRoute = '/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/dataset*'

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const remoteDatasets: IRemoteDatasetModel[] = await get(datasetRoute, stringify(query, { arrayFormat: 'bracket' }))
  const localDatasets = toLocalDatasets(remoteDatasets)
  return localDatasets
}

