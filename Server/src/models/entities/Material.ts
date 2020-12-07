import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, EntityManager } from "typeorm";
import { Composition } from "./Composition";
import { Dataset } from "./Dataset";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles materials and has a foreign key for it's chemical compositon
 */
@Entity()
export class Material {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 1 })
    compositionId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Composition table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Composition)
    @JoinColumn()
    composition?: Composition

    @Column({ nullable: true })
    details: string

    /*
    * This ManyToMany snippet is used to complete the link between the 
    * Dataset and Material tables. JoinTable is intentionally ommitted as this 
    * side is the "independent" side of the relation.
    * The 'dataset => dataset.materials' line is added for use in query building
    * for it defines the direction of the "link" with the Dataset table
    */
    @ManyToMany(type => Dataset, dataset => dataset.materials)
    datasets: Dataset[];

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}

export const selectMaterialQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')

export const selectMaterialBasedOnSingleMateriarlQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Dataset, 'dataset')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')