import { createConnection, getConnection } from 'typeorm';
import { retrieveBasicData } from '../../services/getBasicDataService';

describe('basic data service test', () => {
    let retrieveBasicDataObject: retrieveBasicData;
    jest.setTimeout(60000)

    beforeAll(async () => {
        await createConnection();
        retrieveBasicDataObject = new retrieveBasicData();
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