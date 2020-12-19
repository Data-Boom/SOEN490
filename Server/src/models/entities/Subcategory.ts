import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles subcategories
 */
@Entity()
export class Subcategory {

    @PrimaryGeneratedColumn()
    id: number

    //Readd { unique: true } later if desired. For now, potential source of crash in remote DB
    @Column()
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}