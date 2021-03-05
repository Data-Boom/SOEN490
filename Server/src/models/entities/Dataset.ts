import { Publications } from './Publications';
import { Connection, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Category } from './Category';
import { Subcategory } from './Subcategory';
import { Material } from './Material';
import { Datasetdatatype } from './Datasetdatatype';
import { Accounts } from './Accounts';

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
    name: string

    @Column({ default: 1 })
    datatypeId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Datasetdatatype table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Datasetdatatype)
    @JoinColumn()
    datatype?: Datasetdatatype

    @Column()
    publicationId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Publications table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Publications)
    @JoinColumn()
    publication?: Publications

    @Column({ default: 1 })
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
    comments: string

    /*
    * This ManyToMany snippet is used to complete the link between the 
    * Dataset and Accounts tables. JoinTable is intentionally ommitted as this 
    * side is the "independent" side of the relation.
    * The 'account => account.datasets' line is added for use in query building
    * for it defines the direction of the "link" with the Accounts table
    * 
    * Specifically this is being used to track the 'favorited' datasets of a user,
    * in contrast to the previous relation
    */
    @ManyToMany(type => Accounts, account => account.datasets)
    accounts: Accounts[];

    /* 
    * This particular ManyToOne relation is being used to track which account uploaded
    * the dataset in question
    */
    @Column({ nullable: true })
    uploaderId: number

    @ManyToOne(type => Accounts)
    @JoinColumn()
    uploader?: Accounts

    @Column({ type: 'integer', default: 0 })
    isApproved: number

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}

export const selectDatasetIdsQuery = (connection: Connection) =>
    connection.createQueryBuilder(Dataset, 'dataset')
        .select('dataset.id', 'dataset_id')

export const selectDatasetsQuery = (connection: Connection) =>
    connection.createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'id')
        .addSelect('datasetdatatype.name', 'data_type')
        .addSelect('category.id', 'category')
        .addSelect('subcategory.id', 'subcategory')
        .addSelect('dataset.comments', 'comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .innerJoin(Category, 'category', 'subcategory.categoryId = category.id')

export const selectDatasetIdsBasedOnApprovalStatusQuery = (connection: Connection, isApproved: number) =>
    connection.createQueryBuilder(Dataset, 'dataset')
        .select('dataset.id', 'dataset_id')
        .where('dataset.isApproved = :isApproved', { isApproved: isApproved })
        .getRawMany();
