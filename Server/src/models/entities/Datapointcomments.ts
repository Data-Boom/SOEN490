import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, EntityManager } from "typeorm";
import { Dataset } from "./Dataset";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class Datapointcomments {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    datasetId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Dataset table
    */
    @ManyToOne(type => Dataset)
    @JoinColumn()
    dataset?: Dataset

    @Column({ type: "json" })
    comments: string[]

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}

export const selectDataPointCommentsQuery = (manager: EntityManager, idArray: any[]) =>
    manager.createQueryBuilder(Dataset, 'dataset')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Datapointcomments, 'datapointcomments', 'datapointcomments.datasetId = dataset.id')
        .whereInIds(idArray)
        .getRawMany();
