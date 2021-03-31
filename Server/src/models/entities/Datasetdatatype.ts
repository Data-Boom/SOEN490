import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class Datasetdatatype extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}