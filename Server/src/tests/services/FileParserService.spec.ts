import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { DataParserService } from '../../services/Parser/DataParserService'

describe('Data Parser Service', () => {

    let dataParserService: DataParserService
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
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Valid - Request to Extract a JSON file', async () => {
        let extension = 'json'
        let filePath = 'src/tests/testData/25a6488a2135bdeae7e26a8e9baac62f'
        dataParserService = new DataParserService(extension, filePath)
        let response: any = await dataParserService.parseData()
        expect(response.statusCode).toBe(200);
    })

    test('Invalid - Request to Extract a non-existing file', async () => {
        let res = "ENOENT: no such file or directory, unlink ''"
        let extension = 'json'
        let filePath = ''
        dataParserService = new DataParserService(extension, filePath)
        try {
            await dataParserService.parseData()
        } catch (error) {
            expect(error.message).toBe(res);
        }
    })

    test('Invalid - Request to Extract a broken JSON file', async () => {
        let res = "Cannot parse your file. Something is wrong with it"
        let extension = 'json'
        let filePath = 'src/tests/testData/brokenJSON'
        dataParserService = new DataParserService(extension, filePath)
        try {
            await dataParserService.parseData()
        } catch (error) {
            expect(error.message).toBe(res);
        }
    })
})