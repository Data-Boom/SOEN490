import { Connection, getConnection } from "typeorm";
import { Dataset } from "./entities/Dataset";
import { Unapproveddatasets } from "./entities/Unapproveddatasets";
import { IDatasetIDModel } from "./interfaces/DatasetModelInterface";


export class DatasetApprovalModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

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
}