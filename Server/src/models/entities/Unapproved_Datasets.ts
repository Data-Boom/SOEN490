import { Column, Connection, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Dataset } from './Dataset';

@Entity()
export class Unapproveddatasets {

  @PrimaryColumn()
  datasetId: number

  @Column({ nullable: true })
  flaggedComment: string

  @Column({ default: false })
  isFlagged: boolean

  @OneToOne(type => Dataset)
  @JoinColumn()
  dataset?: Dataset
}
