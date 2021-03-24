import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Connection, BaseEntity } from "typeorm";
import { Accounts } from "./Accounts";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class Graphstate extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    accountId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Dataset table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Accounts)
    @JoinColumn()
    account?: Accounts

    @Column()
    name: string

    // IDisplayedDatasetModel values stored below
    @Column({ type: "json" })
    datasetIds: number[]

    @Column({ type: "json" })
    datasetColors: string[]

    @Column({ type: "json" })
    datasetShapes: string[]

    @Column({ type: "json" })
    datasetHiddenStatus: boolean[]

    // IAxisModel values stored below
    @Column({ type: "json" })
    axisVariable: string[]

    @Column({ type: "json" })
    axisLog: boolean[]

    @Column({ type: "json" })
    axisZoomStart: number[]

    @Column({ type: "json" })
    axisZoomEnd: number[]

    @Column({ type: "json" })
    axisUnits: string[]

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}

export const selectGraphStateQuery = (connection: Connection) =>
    connection.createQueryBuilder(Graphstate, 'graphs')
        .select('graphs.name', 'name')
        .addSelect('graphs.id', 'id')
        .addSelect('graphs.datasetIds', 'datasetIds')
        .addSelect('graphs.datasetColors', 'datasetColors')
        .addSelect('graphs.datasetShapes', 'datasetShapes')
        .addSelect('graphs.datasetHiddenStatus', 'datasetHiddenStatus')
        .addSelect('graphs.axisVariable', 'axisVariable')
        .addSelect('graphs.axisLog', 'axisLog')
        .addSelect('graphs.axisZoomStart', 'axisZoomStart')
        .addSelect('graphs.axisZoomEnd', 'axisZoomEnd')
        .addSelect('graphs.axisUnits', 'axisUnits')

export const selectGraphOwnerQuery = (connection: Connection, graphId: number) =>
    connection.createQueryBuilder(Graphstate, 'graphs')
        .select('graphs.accountId')
        .where('graphs.id = :id', { id: graphId })
        .getOne();
