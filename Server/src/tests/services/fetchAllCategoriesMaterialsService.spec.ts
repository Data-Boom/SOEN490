import { createConnection, getConnection } from 'typeorm';
import { fetchAllCategoriesMaterialsService } from '../../services/fetchAllCategoriesMaterialsService';

describe('basic data service test', () => {
    let retrieveBasicDataObject: fetchAllCategoriesMaterialsService;
    jest.setTimeout(60000)

    beforeAll(async () => {
        await createConnection();
        retrieveBasicDataObject = new fetchAllCategoriesMaterialsService();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Asks for all categories, expects at least one category returned', async done => {
        let arrayOfData = await retrieveBasicDataObject.getBasicCategoryDataService();
        expect(arrayOfData[0].id).not.toBeUndefined()
        done()
    });

    test('Asks for all subcategories, expects at least one subcategory returned', async done => {
        let arrayOfData = await retrieveBasicDataObject.getBasicSubcategoryDataService();
        expect(arrayOfData[0].id).not.toBeUndefined()
        done()
    });

    test('Asks for all materials, expects at least one material returned', async done => {
        let arrayOfData = await retrieveBasicDataObject.getBasicMaterialDataService();
        expect(arrayOfData[0].id).not.toBeUndefined()
        done()
    });
})