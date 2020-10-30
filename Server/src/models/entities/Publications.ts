import {Authors} from './Authors';
import {Publicationtype} from './Publicationtype';
import {Publisher} from './Publisher';
import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles publications and has foreign key references to:
 * the publisher, publication type, and authors
 */
@Entity()
export class Publications {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @Column({ nullable: true, type: "int" })
    pages: number

    @Column({ nullable: true, type: "int" })
    volume: number

    @Column({default: 1})
    publicationtypeId: number

    @ManyToOne(type => Publicationtype)
    @JoinColumn()
    publicationtype?: Publicationtype

    @Column({default: 1})
    publisherId: number

    @ManyToOne(type => Publisher)
    @JoinColumn()
    publisher?: Publisher

    @Column({type: "int", width: 4})
    year: number

    @Column({nullable: true})
    datePublished: Date

    @Column({nullable: true})
    dateAccessed: Date

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date

    @ManyToMany(type => Authors, author => author.publications)
    @JoinTable() 
    authors: Authors[];
}