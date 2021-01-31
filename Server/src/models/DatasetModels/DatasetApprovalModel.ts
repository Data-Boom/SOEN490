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
        let userFlaggedDatasets = await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_datasets')
            .select('dataset.id', 'dataset_id')
            .innerJoin(Dataset, 'dataset', 'dataset.id = unapproved_datasets.datasetId')
            .where('unapproved_datasets.isFlagged = :flag', { flag: 1 })
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

    private async approveSingleDatasetQuery(datasetId: number) {
        await this.connection.createQueryBuilder()
            .update(Dataset)
            .set({ isApproved: 1 })
            .where('id = :datasetId', { datasetId: datasetId })
            .execute()
    }

    async flagDataSet(datasetId: number, flaggedComment?: string, additionalComment?: string) {
        await this.updateDatasetComments(datasetId, additionalComment)
        await this.connection.createQueryBuilder()
            .update(Unapproveddatasets)
            .set({ flaggedComment: flaggedComment, isFlagged: 1 })
            .where('datasetId = :datasetId', { datasetId: datasetId })
            .execute()
        return "Dataset Flagged!"
    }

    async verifyUnapprovedDatasetUploader(id: number, userId: number): Promise<any> {
        let upload = await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_datasets')
            .select('dataset.uploaderId', 'uploaderId')
            .addSelect('unapproved_datasets.isFlagged', 'isFlagged')
            .innerJoin(Dataset, 'dataset', 'dataset.id = unapproved_datasets.datasetId')
            .where('dataset.id = :id', { id: id })
            .getRawOne();
        if (upload == undefined || upload.uploaderId != userId) {
            return "User ID does not match uploader ID!"
        }
        else if (upload.isFlagged != 1) {
            return "You cannot approve a data set until it passes initial screening!"
        }
        else {
            return true
        }
    }

    async approveDataset(datasetId: number) {
        await this.approveSingleDatasetQuery(datasetId)
        await this.commonModel.wipeEntryFromUnapprovedTable(datasetId)
        return "Successfully approved new data set"
    }

    async updateDatasetComments(datasetId: number, datasetCommentsToAppend?: string) {
        if (datasetCommentsToAppend !== null && datasetCommentsToAppend !== undefined) {
            let oldComment = await this.selectDatasetCommentQuery(datasetId)
            let newComment = oldComment.comments.concat(" " + datasetCommentsToAppend)
            await this.connection.createQueryBuilder()
                .update(Dataset)
                .set({ comments: newComment })
                .where('id = :datasetId', { datasetId: datasetId })
                .execute()
        }
    }

    async fetchUnapprovedDatasetsInfo(idArray: number[]): Promise<any[]> {
        let approvalData = await selectUnapprovedDatasetInfoQuery(this.connection)
            .whereInIds(idArray)
            .getRawMany();
        return approvalData;
    }
}