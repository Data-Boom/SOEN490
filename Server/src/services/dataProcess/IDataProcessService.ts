export abstract class FileHandlerFactory {

    abstract getFileHandler(filePath?: string): AbstractFileHandler
}

export abstract class AbstractFileHandler {
    filePath: string
    parsedFileData: any

    constructor(filePath: string) {
        this.filePath = filePath
    }
    protected abstract parseFile()

    protected abstract uploadData(data: any)

    //Optional Implementation for CSV & TXT files
    protected validateExtractedData?(data: any)

    //Optional Implementation for CSV & TXT files
    protected extractDataFromFileType?()
}