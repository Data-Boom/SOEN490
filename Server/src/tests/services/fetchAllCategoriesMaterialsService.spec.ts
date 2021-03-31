import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { fetchAllCategoriesMaterialsService } from '../../services/fetchAllCategoriesMaterialsService';

describe('get all materials/categories service test', () => {
  let retrieveBasicDataObject: fetchAllCategoriesMaterialsService;
  jest.setTimeout(60000)

  beforeAll(async () => {
    try {
      await createConnection();
    } catch (error) {
      // If AlreadyHasActiveConnectionError occurs, return already existent connection
      if (error.name === "AlreadyHasActiveConnectionError") {
        return getConnectionManager().get();
      }
    }
    retrieveBasicDataObject = new fetchAllCategoriesMaterialsService();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Asks for all materials, expects at least one material returned', async done => {
    let arrayOfData = await retrieveBasicDataObject.getBasicMaterialDataService();
    expect(arrayOfData[0].id).not.toBeUndefined()
    done()
  });
})