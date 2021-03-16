import parse from "csv-parse";
import { AbstractFileExtractor, FileExtractorFactory } from "./FileHandlerFactory";

const fileSystem = require('fs');


export class CSVFileExtractorFactory extends FileExtractorFactory {

  getFileHandler(filePath: string): AbstractFileExtractor {
    return new CSVFileExtractor(filePath)
  }
}

export class CSVFileExtractor extends AbstractFileExtractor {
  constructor(filePath: string) {
    super(filePath);
  }

  async parseFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileData = []
      const objects = []
      fileSystem.createReadStream(this.filePath)
        .pipe(
          parse({
            delimiter: ','
          })
        )
        .on('data', function (dataRow) {
          fileData.push(dataRow)
        })
        .on('end', function () {
          let properties = fileData.shift()
          for (var i = 0; i < fileData.length; i++) {
            let object = {}
            for (var j = 0; j < properties.length; j++) {
              let property = properties[j];
              object[property] = fileData[i][j]
            }
            objects.push(object)
          }
          resolve(objects)
        })
        .on('error', reject);
    })
  }
}