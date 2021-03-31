import { FetchAllMaterialsModel } from "../models/FetchAllMaterialsModel";
import { IMaterial } from "../models/interfaces/MaterialInterface";

export class FetchAllMaterialsService {
    private model: FetchAllMaterialsModel;

    constructor() {
        this.model = new FetchAllMaterialsModel();
    }

    async fetchAllMaterialDataService() {
        let materialData: IMaterial[] = await this.model.fetchMaterialDataQuery()
        return materialData;
    }
}