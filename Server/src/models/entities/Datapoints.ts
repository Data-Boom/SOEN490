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

    @Column()
    name: String

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Dataset table
    */
    @ManyToOne(type => Dataset)
    @JoinColumn()
    dataset?: Dataset

    @Column({ type: "json" })
    values: number[]

    @Column()
    unitsId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Units table
    */
    @ManyToOne(type => Units)
    @JoinColumn()
    units?: Units

    @Column({ nullable: true })
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