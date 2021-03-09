import { FetchAllCategoriesMaterialsModel } from "../models/FetchAllCategoriesMaterialsModel";
import { IMaterial } from "../models/interfaces/MaterialInterface";

export class fetchAllCategoriesMaterialsService {
    private dataQuery: FetchAllCategoriesMaterialsModel;

    constructor() {
        this.dataQuery = new FetchAllCategoriesMaterialsModel();
    }

    async getBasicMaterialDataService() {
        let materialData: IMaterial[] = await this.dataQuery.getBasicMaterialDataQuery()
        return materialData;
    }
}