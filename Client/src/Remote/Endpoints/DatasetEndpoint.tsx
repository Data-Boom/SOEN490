import { get, post } from "../FluentRequest"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import { toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

const userUploadedDatasetsRoute = '/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/api/v1/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/api/v1/dataset'
const dataUploadRoute = '/api/v1/dataUpload'

export const callGetDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const result = await get(datasetRoute).withQuery(query).json()
  const localDatasets = toLocalDatasets(result)
  return localDatasets
}

export const callSaveDataset = async (dataset: IDatasetModel): Promise<number> => {
  const result = await post(dataUploadRoute).withBody(dataset).json()
  return result
}