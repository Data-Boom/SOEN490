import { GetBasicDataModel } from "../models/GetBasicDataModel";
import { ICategory } from "../models/interfaces/CategoryInterface";
import { IMaterial } from "../models/interfaces/MaterialInterface";
import { ISubcategory } from "../models/interfaces/SubcategoryInterface";

export class retrieveBasicData {
    private dataQuery: GetBasicDataModel;

    constructor() {
        this.dataQuery = new GetBasicDataModel();
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