import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles units (ex. GPa, km/s) of data points
 */
@Entity()
export class Units {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 10 })
    units: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    //TODO: NEED TO TALK TO SEAN ABOUT ADDING A MANY TO MANY WITH DIMENSION

}