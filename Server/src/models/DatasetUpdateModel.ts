import { Connection, getConnection } from "typeorm";
import { Dataset } from './entities/Dataset';
import { Unapproveddatasets } from "./entities/Unapproveddatasets";

/**
 * This model class is responsible for updating the database with the extracted from the fileUpload. 
 */
export class DatasetUpdateModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
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
        await this.wipeEntryFromUnapprovedTable(datasetId)
        return "Successfully approved new Dataset"
    }

    // async adminApprovedDataSet(datasetId: number, datasetCommentsToAppend: string) {
    //     await this.updateDatasetComments(datasetId, datasetCommentsToAppend)
    //     await this.updateApprovedStatus(datasetId)
    //     await this.wipeEntryFromUnapprovedTable(datasetId)
    //     return "Success"
    // }

    async updateDatasetComments(datasetId: number, datasetCommentsToAppend?: string) {
        let oldComment = await this.selectDatasetCommentQuery(datasetId)
        let newComment = oldComment.concat(" " + datasetCommentsToAppend)
        await this.connection.createQueryBuilder(Dataset, 'dataset')
            .update('dataset')
            .set({ comments: newComment })
            .where('dataset.id = :datasetId', { datasetId: datasetId })
            .execute()
    }

    private async wipeEntryFromUnapprovedTable(datasetId: number) {
        await this.connection.createQueryBuilder()
            .delete()
            .from(Unapproveddatasets)
            .where("datasetId = :id", { id: datasetId })
            .execute();
    }

    private selectDatasetCommentQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .select('dataset.comments', 'comments')
            .where('dataset.id = :id', { id: id })
            .getRawOne();

}
