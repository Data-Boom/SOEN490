import { CSVFileExtractorFactory } from "../../services/dataExtraction/CSVFileHandlerFactory";

describe('CSF Parser tests', () => {
    const fileSystem = require('fs');

    let csvFile = "src/tests/testData/csv_data_upload_sample.csv"
    let txtFile = "src/tests/testData/txt_csv_data_upload_sample.txt"

    let csvFileFactory = new CSVFileExtractorFactory()

    let expectation = [{ "Initial Pressure": "101", "Initial Temperature": "293", "Cell Size": "12" }, { "Initial Pressure": "50", "Initial Temperature": "293", "Cell Size": "24" }, { "Initial Pressure": "25", "Initial Temperature": "293", "Cell Size": "48" }]

    test('Test parsing CSV file', async () => {
        let fileHandler = csvFileFactory.getFileHandler(csvFile)
        let parsedData = fileHandler.parseFile()
        expect(parsedData).toBe(expectation);
    });

    test('Test parsing txt file', async () => {
        let fileHandler = csvFileFactory.getFileHandler(txtFile)
        let parsedData = fileHandler.parseFile()
        expect(parsedData).toBe(expectation);
    });

})