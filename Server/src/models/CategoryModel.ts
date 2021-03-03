import { BadRequest } from "@tsed/exceptions";
import { getConnection } from "typeorm";
import { runInThisContext } from "vm";
import { Category } from "./entities/Category";
import { Dataset } from "./entities/Dataset";
import { Subcategory } from "./entities/Subcategory";

export class CategoryModel {

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

    /**
    * This method deletes an existing category, if it or it's subcategories are not in
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
        getConnection().createQueryBuilder(Dataset, 'dataset')
            .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
            .innerJoin(Category, 'category', 'subcategory.categoryId = category.id')
            .where('category.id = :id', { id: id })
            .getRawOne()
}