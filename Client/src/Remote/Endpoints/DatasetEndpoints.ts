import { IApprovalDatasetModel } from './../../../../Server/src/models/interfaces/DatasetModelInterface';
import { IDataSetModel } from './../../../../Server/src/genericInterfaces/DataProcessInterfaces';
import { IDatasetModel } from './../../Models/Datasets/IDatasetModel';
import { get, post, put } from "../RemoteHelper"
import { IRemoteDatasetModel, toLocalDatasets } from '../../Models/Datasets/IRemoteDatasetModel';
import { IRemoteApprovedDatasetModel } from '../../Models/Datasets/IRemoteApprovedDatasetModel';

const datasetRoute = '/api/v1/dataset'
const flagDatasetRoute = '/api/v1/flagDataSet/'
const adminApprovedDatasetRoute = '/api/v1/adminApprovedDataset/'
const unapprovedDatasetsRoute = '/api/v1/dataset/fetchUnapprovedDatasets'

export const getUnapprovedDatasets = async (): Promise<IDatasetModel[]> => {
    const remoteDatasets: IRemoteApprovedDatasetModel[] = await get(unapprovedDatasetsRoute)
    const localDatasets = toLocalDatasets(remoteDatasets)
    return localDatasets
}

export const flagDataset = async (datasetId: number, dataset: IDataSetModel): Promise<IDatasetModel> => {
    const flaggedDataset = await put(flagDatasetRoute + '/' + datasetId, dataset)
    return flaggedDataset
}

export const callRejectDataset = async (datasetId: number): Promise<IDatasetModel> => {
    const deletedDataset = await get(datasetRoute + '/' + datasetId)
    return deletedDataset
}

export const adminApprovedDataset = async (datasetId: number, dataset: IDatasetModel): Promise<IDatasetModel> => {
    const adminApprovedDataset = await put(adminApprovedDatasetRoute + '/' + datasetId, dataset)
    return adminApprovedDataset
}




