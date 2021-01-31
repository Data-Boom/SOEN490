import { IRemoteApprovedDatasetModel, toLocalDatasets } from '../../Models/Datasets/IRemoteApprovedDatasetModel';
import { _delete, get, post, put } from "../RemoteHelper"

import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IFlaggedDatasetQuery } from './../../Models/Datasets/IApprovedDatasetModel';
import SnackbarUtils from '../../Components/Utils/SnackbarUtils';
import { stringify } from 'query-string';

const datasetRoute = '/api/v1/dataset/'
const flagDatasetRoute = '/api/v1/flagDataSet'
const adminApprovedDatasetRoute = '/api/v1/approveDataset'
const unapprovedDatasetsRoute = '/api/v1/dataset/fetchUnapprovedDatasets'

export const getUnapprovedDatasets = async (): Promise<IApprovedDatasetModel[]> => {
    const remoteDatasets: IRemoteApprovedDatasetModel[] = await get(unapprovedDatasetsRoute)
    const localDatasets = toLocalDatasets(remoteDatasets)
    return localDatasets
}

export const flagDataset = async (query: IFlaggedDatasetQuery) => {
    const result = await put(flagDatasetRoute + "?" + stringify(query, { arrayFormat: 'bracket' }))
    if (result == 'Dataset Flagged!') {
        SnackbarUtils.success(`Dataset ${query.datasetId} was flagged!`)
    }
}

export const callRejectDataset = async (datasetId: number) => {
    const result = await _delete(datasetRoute + datasetId)
    console.log(result)
    if (result == 'Successfully removed data set') {
        SnackbarUtils.success(`Dataset ${datasetId} was deleted!`)
    }
}

export const adminApprovedDataset = async (query: IFlaggedDatasetQuery) => {
    const result = await put(adminApprovedDatasetRoute + "?" + stringify(query, { arrayFormat: 'bracket' }))
    console.log(result)
    if (result == 'Successfully approved new data set') {
        SnackbarUtils.success(`Dataset ${query.datasetId} was approved!`)
    }
}




