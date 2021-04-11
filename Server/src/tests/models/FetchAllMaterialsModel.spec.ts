import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { FetchAllMaterialsModel } from '../../models/FetchAllMaterialsModel';

describe('Fetch all materials model test', () => {
  let model: FetchAllMaterialsModel;
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
    model = new FetchAllMaterialsModel();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Request all materials, expect to find at least one non-null entry', async done => {
    let data = await model.fetchMaterialDataQuery();
    expect(data[0].id).not.toBeUndefined()
    done()
  });
})