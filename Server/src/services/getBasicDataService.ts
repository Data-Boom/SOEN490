import { Connection, getConnection } from "typeorm";
import { selectAllCategoriesQuery } from "../models/entities/Category";
import { selectAllMaterialsQuery } from "../models/entities/Material";
import { selectAllSubcategoriesQuery } from "../models/entities/Subcategory";
import { ICategory } from "../models/interfaces/CategoryInterface";
import { IMaterial } from "../models/interfaces/MaterialInterface";
import { ISubcategory } from "../models/interfaces/SubcategoryInterface";

export class retrieveBasicData {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    async getBasicCategoryData() {
        let categoryData: ICategory[] = await selectAllCategoriesQuery(this.connection.manager)
        return categoryData;
    }

    async getBasicSubcategoryData() {
        let subcategoryData: ISubcategory[] = await selectAllSubcategoriesQuery(this.connection.manager)
        return subcategoryData;
    }
    async getBasicMaterialData() {
        let materialData: IMaterial[] = await selectAllMaterialsQuery(this.connection.manager)
        return materialData;
    }
}