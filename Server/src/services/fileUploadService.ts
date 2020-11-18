const fileSystem = require('fs');
import { DataUploadModel } from '../models/DataUploadModel'


/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */

export class fileUploadService {
  protected inputFile: string;
  private uploadModel: DataUploadModel

  constructor(inputFile: string) {
    this.inputFile = inputFile;
  }

  async processUpload() {

    let response = await this.jsonUpload(this.inputFile);
    return response;
  }

  private async jsonUpload(filePathOfJson: string) {

    // Category & sub-category still need to be handled - After there is a solution for duplicate DB key
    // The values need to be added in the JSON file, parsed then inserted
    let category: string = '';
    let subcategory: string = '';
    let dataSetName: string = '';
    let dataType: string = '';
    let dataSetComments: string = '';
    let individualDataSetComments: string[] = [];
    let material: any[] = [];
    let referenceType: string = '';
    let referencePublisher: string = '';
    let referenceTitle: string = '';
    let referenceAuthors: any[] = [];
    let referenceYear: number;
    let referencePages: number;
    let referenceVolume: number;

    let jsonObj: any = (JSON.parse(fileSystem.readFileSync(filePathOfJson)));

    // Create this object after the parsing passes
    this.uploadModel = new DataUploadModel();

    // Add Checks for these values
    referenceType = this.checkReferenceType(jsonObj.reference.type);
    let referenceTypeID: number = await this.uploadModel.insertReferenceType(referenceType);

    referencePublisher = jsonObj.reference.publisher;
    let publisherNameId: number = await this.uploadModel.insertPublisher(referencePublisher);

    referenceAuthors = jsonObj.reference.authors;
    await this.uploadModel.insertAuthors(referenceAuthors);

    referenceTitle = jsonObj.reference.title;
    referencePages = jsonObj.reference.pages;
    referenceYear = jsonObj.reference.year;
    referenceVolume = jsonObj.reference.volume;
    let publicationID: number = await this.uploadModel.insertPublication(referenceTitle, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceAuthors);

    material = jsonObj.material;
    await this.uploadModel.insertMaterial(material);

    // category = jsonObj.category;
    // subcategory = jsonObj.subcategory;
    // let categoryIDs = await uploadModel.insertCategories(category, subcategory);

    dataType = jsonObj["data type"];
    let dataSetDataTypeID: number = await this.uploadModel.insertDataSetDataType(dataType)

    dataSetName = jsonObj["dataset name"];
    dataSetComments = jsonObj.data.comments;
    let datasetID: number = await this.uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID,/** categoryIDs, */ material, dataSetComments)

    for (let i = 0; i < jsonObj.data.variables.length; i++) {

      let dataPointValues: any[] = this.getDataInformationFromContentsArray(jsonObj.data.contents, i);
      let dataVariableName: string = jsonObj.data.variables[i].name;
      let units: string = jsonObj.data.variables[i].units;
      let repr: string = jsonObj.data.variables[i].repr;

      let unitsID: number = await this.uploadModel.insertUnits(units);
      let reprID: number = await this.uploadModel.insertRepresentation(repr);
      await this.uploadModel.insertDataPointsOfSet(datasetID, dataVariableName, dataPointValues[0], unitsID, reprID)
      individualDataSetComments = dataPointValues[1];
    }

    await this.uploadModel.insertDataPointsOfSetComments(datasetID, individualDataSetComments)

    return "Upload was successful!";
  }

  private getDataInformationFromContentsArray(dataContentArray: any[], index: number) {

    let dataPointsForVariable: any = [];
    let dataSetComments: string[] = [];

    for (var i = 0; i < dataContentArray.length; i++) {
      dataPointsForVariable.push(dataContentArray[i].point[index]);
      dataSetComments.push(dataContentArray[i].comments);
    }
    let contentsArrayInfo = [dataPointsForVariable, dataSetComments];
    return contentsArrayInfo;
  }

  private checkReferenceType(someRefType: string) {
    let refType = '';
    if (someRefType == "book") {
      refType = "book";
      return refType;
    }
    else if (someRefType == "magazine") {
      refType = "magazine";
      return refType;
    }
    else if (someRefType == "report") {
      refType = "report";
      return refType;
    }
  }

  private isEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }

}