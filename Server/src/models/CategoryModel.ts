import { Category } from "./entities/Category";
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
}