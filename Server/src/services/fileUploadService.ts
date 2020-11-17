const fileSystem = require('fs');
const uploadModel = require('../models/DataUploadModel');


/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */

export class fileUploadService {
  protected inputFile: string;

  constructor(inputFile: string) {
    this.inputFile = inputFile;
  }

  async processUpload() {

    let response = await this.jsonUpload(this.inputFile);
    return response;
  }

  private async jsonUpload(filePathOfJson: string) {

    let category = '';
    let subcategory = '';
    let dataSetName = '';
    let dataType = '';
    let dataSetComments = '';
    let individualDataSetComments = [];
    let material = [];
    let referenceType = '';
    let referencePublisher = '';
    let referenceTitle = '';
    let referenceAuthors = [];
    let referenceYear;
    let referencePages;
    let referenceVolume;

    let jsonObj = (JSON.parse(fileSystem.readFileSync(filePathOfJson)));


    referenceType = this.checkReferenceType(jsonObj.reference.type);
    let referenceTypeID = await uploadModel.insertReferenceType(referenceType);

    referencePublisher = jsonObj.reference.publisher;
    let publisherNameId = await uploadModel.insertPublisher(referencePublisher);

    referenceAuthors = jsonObj.reference.authors;
    await uploadModel.insertAuthors(referenceAuthors);

    referenceTitle = jsonObj.reference.title;
    referencePages = jsonObj.reference.pages;
    referenceYear = jsonObj.reference.year;
    referenceVolume = jsonObj.reference.volume;
    let publicationID = await uploadModel.insertPublication(referenceTitle, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceAuthors);

    material = jsonObj.material;
    await uploadModel.insertMaterial(material);

    // category = jsonObj.category;
    // subcategory = jsonObj.subcategory;
    // let categoryIDs = await uploadModel.insertCategories(category, subcategory);

    dataType = jsonObj["data type"];
    let dataSetDataTypeID = await uploadModel.insertDataSetDataType(dataType)

    dataSetName = jsonObj["dataset name"];
    dataSetComments = jsonObj.data.comments;
    let datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID,/** categoryIDs, */ material, dataSetComments)

    for (var i = 0; i < jsonObj.data.variables.length; i++) {

      let dataPointValues = this.getDataInformationFromContentsArray(jsonObj.data.contents, i);
      let dataVariableName = jsonObj.data.variables[i].name;
      let units = jsonObj.data.variables[i].units;
      let repr = jsonObj.data.variables[i].repr;

      let unitsID = await uploadModel.insertUnits(units);
      let reprID = await uploadModel.insertRepresentation(repr);
      await uploadModel.insertDataPointsOfSet(datasetID, dataVariableName, dataPointValues[0], unitsID, reprID)
      individualDataSetComments = dataPointValues[1];
    }

    await uploadModel.insertDataPointsOfSetComments(datasetID, individualDataSetComments)

    return "Upload was successful!";
  }

  private getDataInformationFromContentsArray(dataContentArray: any[], index: number) {

    let dataPointsForVariable = [];
    let dataSetComments = [];

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