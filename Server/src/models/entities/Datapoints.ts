import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import { Dataset } from "./Dataset";
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
    name: string

    @ManyToOne(type => Dataset)
    @JoinColumn()
    dataset?: Dataset

    @Column({type: "json"})
    values: number[]

    @Column({ nullable: true })
    unitsId: number

    @ManyToOne(type => Units)
    @JoinColumn()
    units?: Units

    @Column({ nullable: true })
    comments: String

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date
}