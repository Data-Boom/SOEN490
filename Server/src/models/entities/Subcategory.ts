import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles subcategories
 */
@Entity()
export class Subcategory {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: String

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date
}