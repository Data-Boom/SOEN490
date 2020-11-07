import { Publications } from './Publications';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles authors 
 */
@Entity()
export class Authors {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: String

    @Column()
    lastName: String

    @Column({ nullable: true })
    middleName: String

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    /*
    * This ManyToMany snippet is used to complete the link between the 
    * Publications and Authors tables. JoinTable is intentionally ommitted as this 
    * side is the "independent" side of the relation.
    * The 'publication => publication.authors' line is added for use in query building
    * for it defines the direction of the "link" with the Dataset table
    */
    @ManyToMany(type => Publications, publication => publication.authors)
    publications: Publications[];
}