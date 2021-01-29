import { IFlaggedDatasetQuery } from './../../Models/Datasets/IApprovedDatasetModel';
import { IRemoteApprovedDatasetModel, toLocalDatasets } from '../../Models/Datasets/IRemoteApprovedDatasetModel';
import { get, post, put } from "../RemoteHelper"

import { IApprovalDatasetModel } from './../../../../Server/src/models/interfaces/DatasetModelInterface';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IDataSetModel } from './../../../../Server/src/genericInterfaces/DataProcessInterfaces';
import { IDatasetModel } from './../../Models/Datasets/IDatasetModel';
import { IRemoteDatasetModel } from '../../Models/Datasets/IRemoteDatasetModel';
import { stringify } from 'query-string';

const datasetRoute = '/api/v1/dataset'
const flagDatasetRoute = '/api/v1/flagDataSet'
const adminApprovedDatasetRoute = '/api/v1/adminApprovedDataset/'
const unapprovedDatasetsRoute = '/api/v1/dataset/fetchUnapprovedDatasets'

export const getUnapprovedDatasets = async (): Promise<IApprovedDatasetModel[]> => {
    const remoteDatasets: IRemoteApprovedDatasetModel[] = await get(unapprovedDatasetsRoute)
    const localDatasets = toLocalDatasets(remoteDatasets)
    return localDatasets
}

/*export const flagDataset = async (datasetId: number): Promise<IRemoteApprovedDatasetModel> => {
    const flaggedDataset: IRemoteApprovedDatasetModel = await put(flagDatasetRoute + '/' + datasetId, datasetId)
    console.log(await put(flagDatasetRoute + '/' + datasetId, datasetId))
    return flaggedDataset
}*/

export const FlagDataset = async (flaggeddatasetQuery: IFlaggedDatasetQuery) => {
    await put(flagDatasetRoute, stringify(flaggeddatasetQuery, { arrayFormat: 'bracket' }))

    //return localDatasets
}

export const callRejectDataset = async (datasetId: number): Promise<IRemoteApprovedDatasetModel> => {
    const deletedDataset = await get(datasetRoute + '/' + datasetId)
    return deletedDataset
}

export const adminApprovedDataset = async (datasetId: number, dataset: IApprovedDatasetModel): Promise<IRemoteApprovedDatasetModel> => {
    const adminApprovedDataset = await put(adminApprovedDatasetRoute + '/' + datasetId, dataset)
    return adminApprovedDataset
}




