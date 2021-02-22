import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel"
import { IRemoteApprovedDatasetModel, toLocalApprovedDatasets } from "../../Models/Datasets/IRemoteApprovedDatasetModel"
import { _delete, get, post, put } from "../FluentRequest"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

const userUploadedDatasetsRoute = '/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/api/v1/dataset/userSavedDatsets/:userSavedDatsets'
const dataUploadRoute = '/api/v1/dataUpload'
const datasetRoute = '/api/v1/dataset'
const flagDatasetRoute = '/api/v1/flagDataSet'
const approvedDatasetRoute = '/api/v1/approveDataset'
const unapprovedDatasetsRoute = '/api/v1/dataset/fetchUnapprovedDatasets'
const submitEditedDatasetRoute = '/api/v1/dataUpload'

export const callGetDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const result = await get(datasetRoute).withQuery(query).json()
  const localDatasets = toLocalDatasets(result)
  return localDatasets
}

export const callSaveDataset = async (dataset: IDatasetModel): Promise<number> => {
  const result = await post(dataUploadRoute).withBody(dataset).json()
  return result
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

export const approvedDataset = async (query: IFlaggedDatasetQuery) => {
  const result = await put(approvedDatasetRoute).withQuery(query).json()
  if (result == 'Successfully approved new data set') {
    SnackbarUtils.success(`Dataset ${query.datasetId} was approved!`)
  }
}
export const submitEditedDataset = async (updatedDataset: IApprovedDatasetModel) => {
  const result = await put(submitEditedDatasetRoute + '/' + updatedDataset.id).withBody(updatedDataset).json()
  if (result == 'Dataset Updated!') {
    SnackbarUtils.success(`Dataset ${updatedDataset.id} was updated!`)
  }
  else
    SnackbarUtils.error(`Dataset ${updatedDataset.id} could not be updated!`)
}