import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles publication types (ex. book, web)
 */
@Entity()
export class Publicationtype {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date
}