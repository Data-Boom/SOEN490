import { DataExtractionService } from '../../services/dataExtraction/DataExtractionService'

describe('Data Extraction Controller', () => {

    let extractionService: DataExtractionService

    test('Valid - Request to Extract a JSON file', async () => {
        let extension = 'json'
        let filePath = 'upload/ae2035724058e2b1a0aca745f67d48c6'
        extractionService = new DataExtractionService(extension, filePath)
        let response: any = await extractionService.extractData()
        expect(response.statusCode).toBe(200);
    })

    test('Invalid - Request to Extract a JSON file', async () => {
        let res = "Cannot parse your file. Something is wrong with it"
        let extension = 'json'
        let filePath = ''
        extractionService = new DataExtractionService(extension, filePath)
        let response: any
        try {
            response = await extractionService.extractData()
        } catch (error) {
            expect(error.message).toBe(res);
        }
    })
})