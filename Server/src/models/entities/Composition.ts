import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles chemical compositions, both for gases and materials
 */
@Entity()
export class Composition {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    composition: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}