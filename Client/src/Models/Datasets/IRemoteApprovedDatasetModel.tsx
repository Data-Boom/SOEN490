import { IRemoteDatasetModel, toLocalDataPoints } from "./IRemoteDatasetModel";

import { IApprovedDatasetModel } from "./IApprovedDatasetModel";

export interface IRemoteApprovedDatasetModel extends IRemoteDatasetModel {
    datasetIsFlagged: number
    datasetFlaggedComment: string
}

export const toLocalApprovedDatasets = (remoteDatasets: IRemoteApprovedDatasetModel[]): IApprovedDatasetModel[] => {
    return remoteDatasets && remoteDatasets.map(remoteDataset => toLocalDatasetModel(remoteDataset)) || []
}

export const toLocalDatasetModel = (remoteDataset: IRemoteApprovedDatasetModel): IApprovedDatasetModel => {
    if (!remoteDataset) {
        return null
    }
    const dataset: IApprovedDatasetModel = {
        datasetIsFlagged: remoteDataset.datasetIsFlagged,
        datasetFlaggedComment: remoteDataset.datasetFlaggedComment,
        category: remoteDataset.dataset_info.category,
        subcategory: remoteDataset.dataset_info.subcategory,
        data: toLocalDataPoints(remoteDataset.dataPoints, remoteDataset.dataPointComments),
        data_type: remoteDataset.dataset_info.datasetDataType,
        dataset_name: remoteDataset.dataset_info.name,
        material: remoteDataset.materials,
        reference: {
            authors: remoteDataset.publication.authors,
            doi: remoteDataset.publication.DOI,
            pages: remoteDataset.publication.pages,
            publisher: remoteDataset.publication.publisher,
            title: remoteDataset.publication.name,
            type: remoteDataset.publication.publicationType,
            volume: remoteDataset.publication.volume,
            year: remoteDataset.publication.year,
        }, id: remoteDataset.dataset_id
    }

    return dataset
}