import { Connection, getConnection } from "typeorm";
import { Composition } from "./entities/Composition";
import { Material } from "./entities/Material";
import { IMaterial } from "./interfaces/MaterialInterface";

export class FetchAllMaterialsModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    async fetchMaterialDataQuery(): Promise<IMaterial[]> {
        let materialData: IMaterial[] =
            await this.connection.createQueryBuilder(Material, 'Material')
                .select('composition.composition', 'composition')
                .addSelect('material.details', 'details')
                .addSelect('material.id', 'id')
                .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
                .getRawMany();
        return materialData;
    }
}