import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { Category } from "./Category";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles subcategories
 */
@Entity()
export class Subcategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 1 })
    categoryId: number

    // FK_3fc84b9483bdd736f728dbf95b2
    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Category table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Category)
    @JoinColumn()
    category?: Category

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
