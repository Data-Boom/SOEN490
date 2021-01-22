import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import { get } from "../RemoteHelper"
import { stringify } from "query-string"
import { toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

const userUploadedDatasetsRoute = '/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/dataset*'

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const remoteDatasets = await get(datasetRoute, stringify(query))
  console.log(remoteDatasets)
  return toLocalDatasets(remoteDatasets)
}