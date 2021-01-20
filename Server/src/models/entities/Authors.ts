import { Publications } from './Publications';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, Connection } from "typeorm";
import { Dataset } from './Dataset';


/**
 * The entity annotation indicates that a table is being created
 * This entity handles authors 
 */
@Entity()
export class Authors {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ nullable: true })
    middleName: string

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

export const selectAuthorsQuery = (connection: Connection, dataset: number) =>
    connection.createQueryBuilder(Dataset, 'dataset')
        .select('author.firstName', 'firstName')
        .addSelect('author.lastName', 'lastName')
        .addSelect('author.middleName', 'middleName')
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .where('dataset.id = :datasetId', { datasetId: dataset })
        .getRawMany();
