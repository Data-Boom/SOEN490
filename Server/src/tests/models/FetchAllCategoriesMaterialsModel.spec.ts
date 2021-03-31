import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { FetchAllCategoriesMaterialsModel } from '../../models/FetchAllCategoriesMaterialsModel';

describe('data service test', () => {
  let basicDataModel: FetchAllCategoriesMaterialsModel;
  jest.setTimeout(60000)

  beforeAll(async () => {
    try {
      await createConnection();
    } catch (error) {
      // If AlreadyHasActiveConnectionError occurs, return already existent connection
      if (error.name === "AlreadyHasActiveConnectionError") {
        const existentConn = getConnectionManager().get();
        return existentConn;
      }
    }
    basicDataModel = new FetchAllCategoriesMaterialsModel();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Request all materials, expect to find at least one non-null entry', async done => {
    let data = await basicDataModel.getBasicMaterialDataQuery();
    expect(data[0].id).not.toBeUndefined()
    done()
  });
})