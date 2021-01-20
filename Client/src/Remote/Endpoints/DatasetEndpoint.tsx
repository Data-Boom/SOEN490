import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import { get } from "../RemoteHelper"
import { stringify } from "query-string"

const userUploadedDatasetsRoute = '/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/dataset*'

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<any> => {
  const remoteDatasets = await get(datasetRoute, stringify(query))
  console.log(remoteDatasets)
  return remoteDatasets
}