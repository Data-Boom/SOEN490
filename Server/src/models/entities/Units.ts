import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles units (ex. GPa, km/s) of data points
 */
@Entity()
export class Units {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    name: String

    @Column({length: 10})
    units: String

    @CreateDateColumn() 
    created: Date

    @UpdateDateColumn()
    updated: Date
}