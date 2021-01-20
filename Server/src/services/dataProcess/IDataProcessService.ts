export abstract class FileHandlerFactory {
    abstract generateFileHandler(filePath?: string): AbstractFileHandler
}

export abstract class AbstractFileHandler {
    filePath?: string
    jsonData: any

    constructor(filePath?: string) {
        if (filePath) {
            this.filePath = filePath
        }
    }
    protected abstract parseFile()

    protected abstract uploadData(data: any)

    //Optional Implementation for CSV & TXT files
    protected validateExtractedData?(data: any)

    //Optional Implementation for CSV & TXT files
    protected extractDataFromFileType?()
}