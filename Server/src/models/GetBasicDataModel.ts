import { Connection, getConnection } from "typeorm";
import { Category } from "./entities/Category";
import { Composition } from "./entities/Composition";
import { Material } from "./entities/Material";
import { Subcategory } from "./entities/Subcategory";
import { ICategory } from "./interfaces/CategoryInterface";
import { IMaterial } from "./interfaces/MaterialInterface";
import { ISubcategory } from "./interfaces/SubcategoryInterface";

export class GetBasicDataModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }
    async getBasicCategoryDataQuery(): Promise<ICategory[]> {
        let categoryData: ICategory[] =
            await this.connection.manager.createQueryBuilder(Category, 'category')
                .select('category.name', 'name')
                .addSelect('category.id', 'id')
                .getRawMany();
        return categoryData;
    }

    async getBasicSubcategoryDataQuery(): Promise<ISubcategory[]> {
        let subcategoryData: ISubcategory[] =
            await this.connection.manager.createQueryBuilder(Subcategory, 'subcategory')
                .select('subcategory.name', 'name')
                .addSelect('subcategory.id', 'id')
                .getRawMany();
        return subcategoryData;
    }
    async getBasicMaterialDataQuery(): Promise<IMaterial[]> {
        let materialData: IMaterial[] =
            await this.connection.manager.createQueryBuilder(Material, 'Material')
                .select('composition.composition', 'composition')
                .addSelect('material.details', 'details')
                .addSelect('material.id', 'id')
                .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
                .getRawMany();
        return materialData;
    }
}