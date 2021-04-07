import { IDataSetModel } from "../../genericInterfaces/DataProcessInterfaces"

const fileSystem = require('fs');

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

  async deleteFile(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      return new Promise((resolve, reject) => {
        fileSystem.unlink(this.filePath, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    }
  }
}