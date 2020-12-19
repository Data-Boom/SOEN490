import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, EntityManager } from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles categories
 */
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    //Readd { unique: true } later if desired. For now, potential source of crash in remote DB
    @Column()
    name: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}

export const selectAllCategoriesQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Category, 'category')
        .select('category.name', 'name')
        .addSelect('category.id', 'id')
        .getRawMany();