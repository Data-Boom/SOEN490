import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Dimension } from "./Dimension";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles units (ex. GPa, km/s) of data points
 */
@Entity()
export class Units {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 10 })
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @Column({ default: 1 })
    dimensionId: number

    @ManyToOne(type => Dimension, dimension => dimension.units)
    @JoinColumn({ name: "dimensionId" })
    dimension: Dimension

    @Column({ length: 100 })
    conversionFormula: string

}