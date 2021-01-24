import { Connection, getConnection } from "typeorm";
import { Publications } from './entities/Publications';
import { Dataset } from './entities/Dataset';
import { Datapoints } from './entities/Datapoints';
import { Datapointcomments } from './entities/Datapointcomments';

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

    async deleteDataset(id: number) {
        let publicationId = await this.selectLinkedPublicationIdQuery(id);
        await this.deleteDatapointCommentsQuery(id)
        await this.deleteDatapointsQuery(id)
        await this.deleteDatasetQuery(id)
        await this.deletePublicationQuery(publicationId)
        return "Success"
    }

    private selectDatasetCommentQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .select('dataset.comments', 'comments')
            .where('dataset.id = :id', { id: id })
            .getRawOne();

    private updateDatasetApprovalQuery = (id: number, status: number, regularComments: string, statusComment: string) =>
        this.connection.createQueryBuilder()
            .update(Dataset)
            .set({ isApproved: status, comments: regularComments, statusComment: statusComment })
            .where("id = :id", { id: id })
            .execute();

    async updateDatasetApproval(id: number, status: number, commentsAddition: string, statusComment: string) {
        let comments = await this.selectDatasetCommentQuery(id);
        comments = comments.concat(" " + commentsAddition)
        await this.updateDatasetApprovalQuery(id, status, comments, statusComment)
    }
}
