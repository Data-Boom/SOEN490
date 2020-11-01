import {Publications} from './Publications';
import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles authors 
 */
@Entity()
export class Authors {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: String

    @Column()
    last_name: String

    @Column({ nullable: true })
    middle_name: String

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date

    @ManyToMany(type => Publications, publication => publication.authors)
    publications: Publications[];
}