import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Dataset } from './Dataset';

@Entity()
export class Unapproveddatasets {

  @PrimaryColumn()
  datasetId: number

  @Column({ nullable: true })
  flaggedComment: string

  @Column({ type: 'integer', default: 0 })
  isFlagged: number

  @OneToOne(type => Dataset)
  @JoinColumn()
  dataset?: Dataset
}

