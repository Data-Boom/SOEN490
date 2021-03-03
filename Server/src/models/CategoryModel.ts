import { BadRequest } from "@tsed/exceptions";
import { Connection, getConnection } from "typeorm";
import { Category } from "./entities/Category";
import { Dataset } from "./entities/Dataset";
import { Subcategory } from "./entities/Subcategory";

export class CategoryModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    /**
    * This method will return all existing dimensions
    */
    async getAllCategories(): Promise<ICategory[]> {
        let categories = await Category.find();
        let subcategories = await Subcategory.find();
        let categoryModels = categories.map(category => {
            let filteredSubcategories = subcategories.filter(value => value.categoryId == category.id)
            let categoryModel = Category.convertToModel(category, filteredSubcategories);
            return categoryModel;
        })
        return categoryModels;
    }

    async updateCategory(categoryInfo: ICategory): Promise<ICategory> {
        let newCategory: ICategory
        let subcategoryIds: number[] = categoryInfo.subcategories.map(value => value.id);
        let foundSubcategories = await Subcategory.find({ where: { categoryId: categoryInfo.id } });
        let subcategoryIdsToDelete: number[] = []
        for (const element of foundSubcategories) {
            if (!subcategoryIds.includes(element.id)) {
                subcategoryIdsToDelete.push(element.id)
            }
        }
        if (subcategoryIdsToDelete.length > 0) {
            let verifyIfInUse = await this.selectOneUseOfSubcategoriesQuery(subcategoryIdsToDelete)
            if (verifyIfInUse) {
                throw new BadRequest("Can't remove a subcategory as it in use by one or more data sets");
            }
            else {
                await this.deleteSubcategoriesQuery(subcategoryIdsToDelete)
            }
        }
        let subcategories = Subcategory.convertToSubcategory(categoryInfo.subcategories, categoryInfo.id)
        let savedSubcategories = await Subcategory.save(subcategories);
        let newSubcategories = Subcategory.convertToModel(savedSubcategories);
        newCategory = {
            id: categoryInfo.id,
            name: categoryInfo.name,
            subcategories: newSubcategories
        }
        let category = Category.convertToCategory(categoryInfo);
        await Category.save(category);
        return newCategory;
    }

    private selectOneUseOfSubcategoriesQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder(Subcategory, 'subcategory')
            .innerJoin(Dataset, 'dataset', 'dataset.subcategoryId = subcategory.id')
            .whereInIds(idArray)
            .getRawOne()

    private deleteSubcategoriesQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Subcategory)
            .whereInIds(idArray)
            .execute();

    /**
    * This method deletes an existing category, if it and it's subcategories are not in
    * use by any data set in the database
    * @param categoryId 
    * A category ID: number
    */
    async deleteCategory(categoryId: number) {
        let verifyIfInUse = await this.selectOneUseOfCategoryQuery(categoryId)
        if (verifyIfInUse) {
            throw new BadRequest("Can't remove a category as it in use by one or more data sets");
        }
        await Subcategory.delete({ "categoryId": categoryId });
        await Category.delete({ "id": categoryId })
    }

    private selectOneUseOfCategoryQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
            .innerJoin(Category, 'category', 'subcategory.categoryId = category.id')
            .where('category.id = :id', { id: id })
            .getRawOne()
}