import { IRemoteApprovedDatasetModel, toLocalDatasets } from '../../Models/Datasets/IRemoteApprovedDatasetModel';
import { get, post, put } from "../RemoteHelper"

import { IApprovalDatasetModel } from './../../../../Server/src/models/interfaces/DatasetModelInterface';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IDataSetModel } from './../../../../Server/src/genericInterfaces/DataProcessInterfaces';
import { IDatasetModel } from './../../Models/Datasets/IDatasetModel';
import { IFlaggedDatasetQuery } from './../../Models/Datasets/IApprovedDatasetModel';
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

export const FlagDataset = async (flaggeddatasetQuery: IFlaggedDatasetQuery) => {
    await put(flagDatasetRoute, stringify(flaggeddatasetQuery, { arrayFormat: 'bracket' }))
    console.log(stringify(flaggeddatasetQuery, { arrayFormat: 'bracket' }))
}

export const callRejectDataset = async (datasetId: string) => {
    const deletedDataset: IApprovedDatasetModel = await get(datasetRoute + '/' + stringify(datasetId))
    //console.log("deleted dataset: " + deletedDataset.id)

    /*fetch(datasetRoute + '/' + item, {
        method: 'delete'
      })
      .then(response => response.json());
    return deletedDataset*/
}

export const adminApprovedDataset = async (datasetId: number, dataset: IApprovedDatasetModel): Promise<IRemoteApprovedDatasetModel> => {
    const adminApprovedDataset = await put(adminApprovedDatasetRoute + '/' + datasetId, dataset)
    return adminApprovedDataset
}




