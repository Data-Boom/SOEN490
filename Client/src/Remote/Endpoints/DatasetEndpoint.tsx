import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel"
import { IRemoteApprovedDatasetModel, toLocalApprovedDatasets } from "../../Models/Datasets/IRemoteApprovedDatasetModel"
import { IRemoteDatasetModel, toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"
import { _delete, get, put } from "../FluentRequest"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import SnackbarUtils from "../../Components/Utils/SnackbarUtils"

const userUploadedDatasetsRoute = '/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/api/v1/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/api/v1/dataset'
const flagDatasetRoute = '/api/v1/flagDataSet'
const adminApprovedDatasetRoute = '/api/v1/approveDataset'
const unapprovedDatasetsRoute = '/api/v1/dataset/fetchUnapprovedDatasets'

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const result = await get(datasetRoute).withQuery(query).json()
  const localDatasets = toLocalDatasets(result)
  return localDatasets
}

export const getUnapprovedDatasets = async (): Promise<IApprovedDatasetModel[]> => {
  const remoteDatasets: IRemoteApprovedDatasetModel[] = await get(unapprovedDatasetsRoute).json()
  const localDatasets = toLocalApprovedDatasets(remoteDatasets)
  return localDatasets
}

export const flagDataset = async (query: IFlaggedDatasetQuery) => {
  const result = await put(flagDatasetRoute).withQuery(query).json()
  if (result == 'Dataset Flagged!') {
    SnackbarUtils.success(`Dataset ${query.datasetId} was flagged!`)
  }
}

export const callRejectDataset = async (datasetId: number) => {
  const result = await _delete(datasetRoute + '/' + datasetId).json()
  if (result == 'Successfully removed data set') {
    SnackbarUtils.success(`Dataset ${datasetId} was deleted!`)
  }
}

export const adminApprovedDataset = async (query: IFlaggedDatasetQuery) => {
  const result = await put(adminApprovedDatasetRoute).withQuery(query).json()
  if (result == 'Successfully approved new data set') {
    SnackbarUtils.success(`Dataset ${query.datasetId} was approved!`)
  }
}