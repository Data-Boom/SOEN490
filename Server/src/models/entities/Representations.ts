import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles "representations" of data points. This is a value used in certain programs
 * denote what a given data value is during calculations and such.
 */
@Entity()
export class Representations {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 20 })
    repr: String

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}