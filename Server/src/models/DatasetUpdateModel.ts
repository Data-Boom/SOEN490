import { Connection, getConnection } from "typeorm";
import { Publications } from './entities/Publications';
import { Dataset } from './entities/Dataset';
import { Datapoints } from './entities/Datapoints';
import { Datapointcomments } from './entities/Datapointcomments';
import { Unapproveddatasets } from "./entities/Unapproveddatasets";

/**
 * This model class is responsible for updating the database with the extracted from the fileUpload. 
 */
export class DatasetUpdateModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    private selectLinkedPublicationIdQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .select('dataset.publicationId', 'publication_id')
            .where('dataset.id = :id', { id: id })
            .getRawOne();

    private deleteDatapointCommentsQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Datapointcomments)
            .where("datasetId = :id", { id: id })
            .execute();

    private deleteDatapointsQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Datapoints)
            .where("datasetId = :id", { id: id })
            .execute();

    private deleteDatasetQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Dataset)
            .where("id = :id", { id: id })
            .execute();

    private deletePublicationQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Publications)
            .where("id = :id", { id: id })
            .execute();

    async rejectDataset(id: number) {
        let publicationId = await this.selectLinkedPublicationIdQuery(id);
        await this.deleteDatapointCommentsQuery(id)
        await this.deleteDatapointsQuery(id)
        await this.deleteDatasetQuery(id)
        await this.deletePublicationQuery(publicationId)
        await this.wipeEntryFromUnapprovedTable(id)
        return "Success"
    }


    async selectAllFlaggedDatasets(): Promise<any> {
        let allFlaggedDatsets = await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_datasets')
            .select()
            .where('unapproved_datasets.isFlagged = 1')
            .getRawMany();
        return allFlaggedDatsets
    }

    async flagDataSet(datasetId: number, flaggedComment?: string) {
        let newFlaggedSet = new Unapproveddatasets()
        newFlaggedSet.datasetId = datasetId
        newFlaggedSet.flaggedComment = flaggedComment
        newFlaggedSet.isFlagged = 1
        await this.connection.manager.save(newFlaggedSet)
        return "Dataset Flagged"
    }

    async approvedDataSet(datasetId: number, datasetCommentsToAppend: string) {
        await this.wipeEntryFromUnapprovedTable(datasetId)
        let oldComment = await this.selectDatasetCommentQuery(datasetId)
        let newComment = oldComment.concat(" " + datasetCommentsToAppend)
        await this.connection.createQueryBuilder(Dataset, 'dataset')
            .update('dataset')
            .set({ comments: newComment, isApproved: 1 })
            .where('dataset.id = :datasetId', { datasetId: datasetId })
            .execute()

        return "Success"
    }

    async wipeEntryFromUnapprovedTable(datasetId: number) {
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
