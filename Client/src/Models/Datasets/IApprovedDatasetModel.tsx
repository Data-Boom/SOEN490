import { IDatasetModel } from "./IDatasetModel";

export interface IApprovedDatasetModel extends IDatasetModel {
    datasetIsFlagged: number
    datasetFlaggedComment: string
}