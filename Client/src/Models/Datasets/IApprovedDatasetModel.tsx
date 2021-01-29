import { IDatasetModel } from "./IDatasetModel";

export interface IApprovedDatasetModel extends IDatasetModel {
    datasetIsFlagged: number
    datasetFlaggedComment: string
}

export interface IFlaggedDatasetQuery {
    datasetId?: number,
    flaggedComment?: string,
    additionalComment?: string
}