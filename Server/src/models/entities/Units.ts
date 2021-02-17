import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Dimension } from "./Dimension";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles units (ex. GPa, km/s) of data points
 */
@Entity()
export class Units extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 10 })
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @Column()
    dimensionId?: number

    @ManyToOne(type => Dimension, dimension => dimension.units)
    @JoinColumn()
    dimension?: Dimension

    @Column({ length: 100 })
    conversionFormula: string

}