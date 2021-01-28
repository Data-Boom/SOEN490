import { IDataSetModel } from './../../../../Server/src/genericInterfaces/DataProcessInterfaces';
import { IDatasetModel } from './../../Models/Datasets/IDatasetModel';
import { get, post, put } from "../RemoteHelper"

const dataset = '/api/v1/dataset'
const fetchDatasetRoute = '/api/v1/dataset/fetchUnapprovedDatasets$'
//const rejectDatasetRoute = '/api/v1/dataset/:datasetId'
const flagDatasetRoute = '/api/v1/flagDataSet/'
const adminApprovedDatasetRoute = '/api/v1/adminApprovedDataset/:datasetId'
const userFlaggedDatasetsRoute = '/api/v1/userFlaggedDatasets'


export const listUnapprovedDatasets = async (): Promise<IDatasetModel> => {
    const unapprovedDatasets = await get(fetchDatasetRoute)
    return unapprovedDatasets
}

export const flagDataset = async (datasetId: number, dataset: IDataSetModel): Promise<IDatasetModel> => {
    const flaggedDataset = await put(flagDatasetRoute + '/' + datasetId, dataset)
    return flaggedDataset
}

export const getUserFlaggedDatasets = async (): Promise<IDatasetModel> => {
    const userFlaggedDatasets = await get(userFlaggedDatasetsRoute)
    return userFlaggedDatasets
}



