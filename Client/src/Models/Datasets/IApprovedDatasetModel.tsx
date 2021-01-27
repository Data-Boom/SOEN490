import { IDatasetModel } from "./IDatasetModel";

export interface IApprovalDatasetModel extends IDatasetModel {
    datasetIsFlagged: number
    datasetFlaggedComment: string
}