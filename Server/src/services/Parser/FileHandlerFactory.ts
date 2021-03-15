import { IDataSetModel } from "../../genericInterfaces/DataProcessInterfaces"

export abstract class FileExtractorFactory {

    abstract getFileHandler(filePath?: string): AbstractFileExtractor
}

export abstract class AbstractFileExtractor {
    filePath: string
    parsedFileData: Partial<IDataSetModel>

    constructor(filePath: string) {
        this.filePath = filePath
    }
    abstract parseFile()

    //Optional Implementation for CSV, PNG, PDF & TXT files
    protected extractDataFromFileType?()

}