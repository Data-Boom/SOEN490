import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
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
    comments: String[]

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}