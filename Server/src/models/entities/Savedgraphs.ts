import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Connection } from "typeorm";
import { Accounts } from "./Accounts";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class Savedgraphs {

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
    axisMode: string[]

    @Column({ type: "json" })
    axisZoom: number[]

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}

export const selectSavedGraphsOfUserQuery = (connection: Connection, user: number) =>
    connection.createQueryBuilder(Savedgraphs, 'graphs')
        .select('graphs.name', 'name')
        .addSelect('graphs.id', 'id')
        .addSelect('graphs.datasetIds', 'datasetIds')
        .addSelect('graphs.datasetColors', 'datasetColors')
        .addSelect('graphs.datasetShapes', 'datasetShapes')
        .addSelect('graphs.datasetHiddenStatus', 'datasetHiddenStatus')
        .addSelect('graphs.axisVariable', 'axisVariable')
        .addSelect('graphs.axisMode', 'axisMode')
        .addSelect('graphs.axisZoom', 'axisZoom')
        .innerJoin(Accounts, 'accounts', 'accounts.accountId = accounts.id')
        .where('accounts.id = :user', { user: user })
        .getRawMany();

export const selectOneSavedGraphQuery = (connection: Connection, id: number) =>
    connection.createQueryBuilder(Savedgraphs, 'graphs')
        .select('graphs.name', 'name')
        .addSelect('graphs.id', 'id')
        .addSelect('graphs.datasetIds', 'datasetIds')
        .addSelect('graphs.datasetColors', 'datasetColors')
        .addSelect('graphs.datasetShapes', 'datasetShapes')
        .addSelect('graphs.datasetHiddenStatus', 'datasetHiddenStatus')
        .addSelect('graphs.axisVariable', 'axisVariable')
        .addSelect('graphs.axisMode', 'axisMode')
        .addSelect('graphs.axisZoom', 'axisZoom')
        .where('graphs.id = :id', { id: id })
        .getRawOne();
