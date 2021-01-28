import { IDataSetModel } from './../../../../Server/src/genericInterfaces/DataProcessInterfaces';
import { IDatasetModel } from './../../Models/Datasets/IDatasetModel';
import { get, post, put } from "../RemoteHelper"

const datasetRoute = '/api/v1/dataset'
const fetchDatasetRoute = '/api/v1/dataset/fetchUnapprovedDatasets$'
const flagDatasetRoute = '/api/v1/flagDataSet/'
const adminApprovedDatasetRoute = '/api/v1/adminApprovedDataset/'
const userFlaggedDatasetsRoute = '/api/v1/userFlaggedDatasets'


export const listUnapprovedDatasets = async (): Promise<IDatasetModel> => {
    const unapprovedDatasets = await get(fetchDatasetRoute)
    return unapprovedDatasets
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




