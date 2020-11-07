import { Publications } from './Publications';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Category } from './Category';
import { Subcategory } from './Subcategory';
import { Material } from './Material';
import { Composition } from './Composition';
import { Datasetdatatype } from './Datasetdatatype';


/**
 * The entity annotation indicates that a table is being created
 * This entity handles data sets and has foreign key references to:
 * data set data type, publication, category, subcategory, material,
 * and has multiple composition references for fuel, oxidizer, and diluent
 */
@Entity()
export class Dataset {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @Column({ nullable: true })
    datatypeId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Datasetdatatype table
    */
    @ManyToOne(type => Datasetdatatype)
    @JoinColumn()
    datatype?: Datasetdatatype

    @Column()
    publicationId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Publications table
    */
    @ManyToOne(type => Publications)
    @JoinColumn()
    publication?: Publications

    @Column({ nullable: true })
    categoryId: number

    @ManyToOne(type => Category)
    @JoinColumn()
    category?: Category

    @Column({ nullable: true })
    subcategoryId: number

    @ManyToOne(type => Subcategory)
    @JoinColumn()
    subcategory?: Subcategory

    /*
    * This ManyToMany and JoinTable snippet is used to link the Dataset table and the
    * Material table together. This will generate a new third table that contains
    * Foreign Keys of linked Dataset and Material IDs.
    * The 'material => material.datasets' line is added for use in query building
    * for it defines the direction of the "link" with the Material table
    */
    @ManyToMany(type => Material, material => material.datasets)
    @JoinTable()
    materials: Material[];

    @Column({ nullable: true })
    comments: String

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}