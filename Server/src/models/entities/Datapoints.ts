import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Connection, BaseEntity } from "typeorm";
import { Dataset } from "./Dataset";
import { Dimension } from "./Dimension";
import { Units } from "./Units";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class Datapoints extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    datasetId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Dataset table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Dataset)
    @JoinColumn()
    dataset?: Dataset

    @Column()
    name: string

    @Column({ type: "json" })
    values: number[]

    @Column({ default: 1 })
    unitsId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Units table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Units)
    @JoinColumn()
    units?: Units

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}

export const selectDataPointsQuery = (connection: Connection) =>
    connection.createQueryBuilder(Dataset, 'dataset')
        .select('datapoints.name', 'name')
        .addSelect('datapoints.values', 'values')
        .addSelect('units.id', 'unitId')
        .addSelect('dimension.id', 'dimensionId')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Datapoints, 'datapoints', 'datapoints.datasetId = dataset.id')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Dimension, 'dimension', 'units.dimensionId = dimension.id')
