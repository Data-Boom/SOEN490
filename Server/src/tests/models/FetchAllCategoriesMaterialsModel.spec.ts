import { createConnection, getConnection } from 'typeorm';
import { FetchAllCategoriesMaterialsModel } from '../../models/FetchAllCategoriesMaterialsModel';

describe('data service test', () => {
    let basicDataModel: FetchAllCategoriesMaterialsModel;
    jest.setTimeout(60000)

    beforeAll(async () => {
        await createConnection();
        basicDataModel = new FetchAllCategoriesMaterialsModel();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Request all categories, expect to find at least one non-null entry', async done => {
        let data = await basicDataModel.getBasicCategoryDataQuery();
        expect(data[0].id).not.toBeUndefined()
        done()
    });

    test('Request all subcategories, expect to find at least one non-null entry', async done => {
        let data = await basicDataModel.getBasicSubcategoryDataQuery();
        expect(data[0].id).not.toBeUndefined()
        done()
    });

    test('Request all materials, expect to find at least one non-null entry', async done => {
        let data = await basicDataModel.getBasicMaterialDataQuery();
        expect(data[0].id).not.toBeUndefined()
        done()
    });
})