import { get } from "../RemoteHelper"
import { stringify } from "query-string"

const userUploadedDatasetsRoute = '/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/dataset*'

interface IDatasetQuery {
  datasetId: string,
  year: string,
  material: string,
  lastName: string,
  categoryId: number
}

const getDatasets = async (query: IDatasetQuery) => {
  const remoteDatasets = await get(datasetRoute, stringify(query))
  console.log(remoteDatasets)
}