import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles categories
 */
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
