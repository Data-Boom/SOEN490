export abstract class FileExtractorFactory {

    abstract getFileHandler(filePath?: string): AbstractFileExtractor
}

export abstract class AbstractFileExtractor {
    filePath: string
    parsedFileData: any

    constructor(filePath: string) {
        this.filePath = filePath
    }
    protected abstract parseFile()

    //Optional Implementation for CSV, PNG, PDF & TXT files
    protected extractDataFromFileType?()

}