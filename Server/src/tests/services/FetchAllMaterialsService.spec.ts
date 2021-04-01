import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { FetchAllMaterialsService } from '../../services/FetchAllMaterialsService';

describe('Fetch all materials service test', () => {
  let service: FetchAllMaterialsService;
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
    service = new FetchAllMaterialsService();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Asks for all materials, expects at least one material returned', async done => {
    let arrayOfData = await service.fetchAllMaterialDataService();
    expect(arrayOfData[0].id).not.toBeUndefined()
    done()
  });
})