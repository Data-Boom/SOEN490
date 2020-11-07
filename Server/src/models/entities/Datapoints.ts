import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Dataset } from "./Dataset";
import { Representations } from "./Representations";
import { Units } from "./Units";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class Datapoints {

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
    name: String

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

    @Column({ default: 1 })
    representationsId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Representations table
    */
    @ManyToOne(type => Representations)
    @JoinColumn()
    representations?: Representations

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}