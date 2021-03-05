import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { Category } from "./Category";
import { ISubcategory } from "./../interfaces/CategoryInterface";


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

    static convertToModel(subcategories: Subcategory[]): ISubcategory[] {
        return subcategories.map(eachSubcategory => {
            return {
                id: eachSubcategory.id,
                name: eachSubcategory.name,
                categoryId: eachSubcategory.categoryId
            };
        });
    }

    static convertToNewSubcategory(subcategoryModel: ISubcategory[], categoryId: number): Subcategory[] {
        return subcategoryModel.map(eachSubcategory => {
            let subcategory = new Subcategory();
            subcategory.id;
            subcategory.name = eachSubcategory.name;
            subcategory.categoryId = categoryId;
            return subcategory;
        });
    }

    static convertToSubcategory(subcategoryModel: ISubcategory[], categoryId: number): Subcategory[] {
        return subcategoryModel.map(eachSubcategory => {
            let subcategory = new Subcategory();
            subcategory.id = eachSubcategory.id;
            subcategory.name = eachSubcategory.name;
            subcategory.categoryId = categoryId;
            return subcategory;
        });
    }
}
