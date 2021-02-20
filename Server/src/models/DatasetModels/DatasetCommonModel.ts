import { Connection, getConnection } from "typeorm";
import { Datapointcomments } from "../entities/Datapointcomments";
import { Dataset } from "../entities/Dataset";
import { Publications } from "../entities/Publications";
import { Publicationtype } from "../entities/Publicationtype";
import { Publisher } from "../entities/Publisher";
import { Unapproveddatasets } from "../entities/Unapproveddatasets";

export class DatasetCommonModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    selectDatasetFKQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .select('dataset.publicationId', 'publicationId')
            .addSelect('dataset.datatypeId', 'datatypeId')
            .addSelect('publisher.id', 'publisherId')
            .addSelect('publicationtype.id', 'publicationTypeId')
            .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
            .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
            .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
            .where('dataset.id = :id', { id: id })
            .getRawOne();

    deleteDatapointCommentsQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Datapointcomments)
            .where("datasetId = :id", { id: id })
            .execute();

    async wipeEntryFromUnapprovedTable(datasetId: number) {
        await this.connection.createQueryBuilder()
            .delete()
            .from(Unapproveddatasets)
            .where("datasetId = :id", { id: datasetId })
            .execute();
    }

    async verifyDatasetExists(id: number): Promise<any> {
        let verification = await this.connection.manager.findOne(Dataset, { id: id });
        return verification
    }

    async verifyUnapprovedDatasetUploader(id: number, userId: number): Promise<any> {
        let upload = await this.connection.createQueryBuilder(Unapproveddatasets, 'unapproved_datasets')
            .select('dataset.uploaderId', 'uploaderId')
            .addSelect('unapproved_datasets.isFlagged', 'isFlagged')
            .innerJoin(Dataset, 'dataset', 'dataset.id = unapproved_datasets.datasetId')
            .where('dataset.id = :id', { id: id })
            .getRawOne();
        if (!upload) {
            return "No such unapproved data set exists!"
        }
        else if (upload.uploaderId != userId) {
            return "User ID does not match uploader ID!"
        }
        else if (upload.isFlagged != 1) {
            return "You cannot approve or reject a data set until it passes initial screening!"
        }
        else {
            return true
        }
    }

    async clearDataSetFlag(datasetId: number) {
        await this.connection.createQueryBuilder()
            .update(Unapproveddatasets)
            .set({ flaggedComment: null, isFlagged: 0 })
            .where('datasetId = :datasetId', { datasetId: datasetId })
            .execute()
    }
}