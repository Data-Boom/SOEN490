import {Publications} from './Publications';
import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";
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

    @ManyToOne(type => Datasetdatatype)
    @JoinColumn()
    datatype?: Datasetdatatype

    @Column()
    publicationId: number

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

    @Column({ nullable: true })
    materialId: number

    @ManyToOne(type => Material)
    @JoinColumn()
    material?: Material

    @Column({ nullable: true })
    fuelId: number

    @ManyToOne(type => Composition)
    @JoinColumn()
    fuel?: Composition

    @Column({ nullable: true })
    oxidizerId: number

    @ManyToOne(type => Composition)
    @JoinColumn()
    oxidizer?: Composition

    @Column({ nullable: true })
    diluentId: number

    @ManyToOne(type => Composition)
    @JoinColumn()
    diluent?: Composition

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date
}