import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Subcategory } from "./Subcategory";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles categories
 */
@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    static convertToModel(category: Category, subcategories: Subcategory[]): ICategory {
        return {
            id: category.id,
            name: category.name,
            subcategories: subcategories.map(eachSubcategory => {
                return {
                    id: eachSubcategory.id,
                    name: eachSubcategory.name,
                    categoryId: category.id
                }
            })
        }
    }
    static convertToModelNoSubs(category: Category): ICategory {
        return {
            id: category.id,
            name: category.name
        }
    }

    static convertToCategory(categoryModel: ICategory): Category {
        let category = new Category();
        category.id = categoryModel.id;
        category.name = categoryModel.name;
        return category;
    }
}
