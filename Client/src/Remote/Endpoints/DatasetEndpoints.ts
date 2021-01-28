import { IDatasetModel } from './../../Models/Datasets/IDatasetModel';
import { get, post, put } from "../RemoteHelper"

const datasetRoute = '/api/v1/dataset/fetchUnapprovedDatasets$'

export const listUnapprovedDatasets = async (): Promise<IDatasetModel> => {
    const unapprovedDatasets = await get(datasetRoute)
    return unapprovedDatasets
}