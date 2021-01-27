import { Connection, getConnection } from "typeorm";
import { Dataset } from "../entities/Dataset";
import { selectUnapprovedDatasetInfoQuery, Unapproveddatasets } from "../entities/Unapproveddatasets";
import { IDatasetIDModel } from "../interfaces/DatasetModelInterface";
import { DatasetCommonModel } from "./DatasetCommonModel";



export class DatasetApprovalModel {
    private connection: Connection;
    private commonModel: DatasetCommonModel
    constructor() {
        this.connection = getConnection();
        this.commonModel = new DatasetCommonModel();
    }

    private selectDatasetCommentQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .select('dataset.comments', 'comments')
            .where('dataset.id = :id', { id: id })
            .getRawOne();

    async selectUserFlaggedDatasets(uploaderId: number): Promise<IDatasetIDModel[]> {
        let userFlaggedDatasets = await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_Datasets')
            .select('unapproved_datasets.datasetId', 'dataset_id')
            .innerJoin(Dataset, 'dataset.id = unapproved_Datasets.datasetId')
            .where('unapproved_datasets.isFlagged = 1')
            .andWhere('dataset.uploaderId = :uploaderId', { uploaderId: uploaderId })
            .getRawMany();
        return userFlaggedDatasets
    }

    async getUnapprovedDatasets(): Promise<IDatasetIDModel[]> {
        let allUnapprovedDatasets = await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_datasets')
            .select('unapproved_datasets.datasetId', 'dataset_id')
            .getRawMany();
        return allUnapprovedDatasets
    }

    async selectAllFlaggedDatasets(): Promise<IDatasetIDModel[]> {
        let allFlaggedDatsets = await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_datasets')
            .select('unapproved_datasets.datasetId', 'dataset_id')
            .where('unapproved_datasets.isFlagged = 1')
            .getRawMany();
        return allFlaggedDatsets
    }

    async updateApprovedStatus(datasetId: number) {
        await this.connection.createQueryBuilder(Dataset, 'dataset')
            .update('dataset')
            .set({ isApproved: 1 })
            .where('dataset.id = :datasetId', { datasetId: datasetId })
            .execute()
    }

    async flagDataSet(datasetId: number, flaggedComment?: string, additionalComment?: string) {
        await this.updateDatasetComments(datasetId, additionalComment)
        await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_datasets')
            .update('unapproved_datasets')
            .set({ flaggedComments: flaggedComment, isFlagged: 1 })
            .where('unapproved_datasets.datasetId = :datasetId', { datasetId: datasetId })
            .execute()
        return "Dataset Flagged!"
    }

    async approveDataset(datasetId: number) {
        await this.updateApprovedStatus(datasetId)
        await this.commonModel.wipeEntryFromUnapprovedTable(datasetId)
        return "Successfully approved new Dataset"
    }

    async updateDatasetComments(datasetId: number, datasetCommentsToAppend?: string) {
        let oldComment = await this.selectDatasetCommentQuery(datasetId)
        let newComment = oldComment.comments.concat(" " + datasetCommentsToAppend)
        await this.connection.createQueryBuilder(Dataset, 'dataset')
            .update('dataset')
            .set({ comments: newComment })
            .where('dataset.id = :datasetId', { datasetId: datasetId })
            .execute()
    }

    async fetchUnapprovedDatasetsInfo(idArray: number[]): Promise<any[]> {
        let approvalData = await selectUnapprovedDatasetInfoQuery(this.connection)
            .whereInIds(idArray)
            .getRawMany();
        return approvalData;
    }
}