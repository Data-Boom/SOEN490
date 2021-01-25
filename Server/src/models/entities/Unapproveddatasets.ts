import { Column, Connection, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Dataset } from './Dataset';

@Entity()
export class Unapproveddatasets {

  @PrimaryColumn()
  datasetId: number

  @Column({ nullable: true })
  flaggedComment: string

  @Column({ default: 0 })
  isFlagged: number

  @OneToOne(type => Dataset)
  @JoinColumn()
  dataset?: Dataset
}

export const selectUnapprovedDatasetInfoQuery = (connection: Connection, dataset: number) =>
  connection.createQueryBuilder(Unapproveddatasets, 'unapproved_dataset')
    .select('unapproved_dataset.flaggedComment', 'flaggedComment')
    .addSelect('unapproved_dataset.isFlagged', 'isFlagged')
    .where('unapproved_dataset.datasetId = :datasetId', { datasetId: dataset })
    .getRawOne();