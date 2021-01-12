import { FetchAllCategoriesMaterialsModel } from "../models/FetchAllCategoriesMaterialsModel";
import { ICategory } from "../models/interfaces/CategoryInterface";
import { IMaterial } from "../models/interfaces/MaterialInterface";
import { ISubcategory } from "../models/interfaces/SubcategoryInterface";

export class fetchAllCategoriesMaterialsService {
    private dataQuery: FetchAllCategoriesMaterialsModel;

    constructor() {
        this.dataQuery = new FetchAllCategoriesMaterialsModel();
    }
    async getBasicCategoryDataService() {
        let categoryData: ICategory[] = await this.dataQuery.getBasicCategoryDataQuery()
        return categoryData;
    }

    async getBasicSubcategoryDataService() {
        let subcategoryData: ISubcategory[] = await this.dataQuery.getBasicSubcategoryDataQuery()
        return subcategoryData;
    }
    async getBasicMaterialDataService() {
        let materialData: IMaterial[] = await this.dataQuery.getBasicMaterialDataQuery()
        return materialData;
    }
}