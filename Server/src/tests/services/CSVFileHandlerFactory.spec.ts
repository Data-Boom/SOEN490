import { CSVFileExtractorFactory } from "../../services/Parser/CSVFileHandlerFactory";

describe('CSV Parser tests', () => {

    let expectation = [{ "Initial Pressure": "101", "Initial Temperature": "293", "Cell Size": "12" }, { "Initial Pressure": "50", "Initial Temperature": "293", "Cell Size": "24" }, { "Initial Pressure": "25", "Initial Temperature": "293", "Cell Size": "48" }]

    let csvFile = "src/tests/testData/csv_data_upload_sample.csv"
    let txtFile = "src/tests/testData/txt_csv_data_upload_sample.txt"

    let csvFileFactory = new CSVFileExtractorFactory()

    test('Test parsing CSV file', async () => {
        let fileHandler = csvFileFactory.getFileHandler(csvFile)
        let parsedData = await fileHandler.parseFile()
        expect(parsedData).toEqual(expectation);
    });

    test('Test parsing txt file', async () => {
        let fileHandler = csvFileFactory.getFileHandler(txtFile)
        let parsedData = await fileHandler.parseFile()
        expect(parsedData).toEqual(expectation);
    });

})