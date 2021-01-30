import { IRemoteApprovedDatasetModel, toLocalDatasets } from '../../Models/Datasets/IRemoteApprovedDatasetModel';
import { _delete, get, post, put } from "../RemoteHelper"
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IFlaggedDatasetQuery } from './../../Models/Datasets/IApprovedDatasetModel';
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
    console.log(stringify(query, { arrayFormat: 'bracket' }))
    await put(flagDatasetRoute + "?" + stringify(query, { arrayFormat: 'bracket' }))
}

export const callRejectDataset = async (datasetId: number) => {
    await _delete(datasetRoute + datasetId)
}

export const adminApprovedDataset = async (query: IFlaggedDatasetQuery) => {
    await put(adminApprovedDatasetRoute + "?" + stringify(query, { arrayFormat: 'bracket' }))
}




