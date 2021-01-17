const fileSystem = require('fs');
import { DataUploadModel } from '../models/DataUploadModel'
import { IMaterials } from '../models/interfaces/MaterialsInterface';
import { IAuthors } from '../models/interfaces/AuthorsInterface';
import { validationSchema } from './validationSchema';

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

  async processUpload(): Promise<string> {

    let response = await this.jsonUpload(this.inputFile);
    return response;
  }

  private async jsonUpload(filePathOfJson: string): Promise<string> {

    let category: string = '';
    let subcategory: string = '';
    let dataSetName: string = '';
    let dataType: string = '';
    let dataSetComments: string = '';
    let individualDataSetComments: string[] = [];
    let material: IMaterials[] = [];
    let referenceType: string = '';
    let referencePublisher: string = '';
    let referenceTitle: string = '';
    let referenceAuthors: IAuthors[] = [];
    let referenceYear: number;
    let referencePages: number;
    let referenceVolume: number;
    let referenceTypeID: number;
    let publisherNameId: number;
    let publicationID: number;
    let dataSetDataTypeID: number;
    let datasetID: number;
    let unitsID: number;
    let reprID: number;
    let response: any;


    let jsonObj: any = (JSON.parse(fileSystem.readFileSync(filePathOfJson)));

    console.log("-----------------------------------Validating--------------------------");

    try {
      validationSchema.validate(jsonObj)
    }
    catch (err) {
      return "error status: " + err.status + ". Message: " + err.message;
    }



    console.log("====================end of validation===================");

    // Create this object after the parsing passes
    this.uploadModel = new DataUploadModel();

    //checks and validates if reference type is a string and handles error--
    referenceType = this.checkReferenceType(jsonObj.reference.type);

    let referenceTypeValidation = this.stringValidation(referenceType);
    if (referenceTypeValidation === false)
      return referenceTypeValidation + " reference type should be a string";

    try {
      referenceTypeID = await this.uploadModel.insertReferenceType(referenceType); console.log('Received reference ID' + referenceTypeID);
    } catch (err) {
      console.log('rejected request for referenceTypeID');
    }

    //checks and validates if reference publisher is a string and handles error--
    referencePublisher = jsonObj.reference.publisher;

    let referencePublisherValidation = this.stringValidation(referencePublisher);
    if (referencePublisherValidation === false)
      return referencePublisherValidation + " reference publisher should be a string";
    try {
      publisherNameId = await this.uploadModel.insertPublisher(referencePublisher);
      console.log('Received publisher name ID' + publisherNameId);
    } catch (err) {
      console.log('rejected request for inserting publisherNameId')
    }

    //checks and validates if ref authors are strings and handles error--
    referenceAuthors = jsonObj.reference.authors;

    this.arrTypeValidationCheck(referenceAuthors, 'string');

    try {
      await this.uploadModel.insertAuthors(referenceAuthors);
      console.log('reference authors: ' + referenceAuthors);
    } catch (err) {
      console.log('reference authors not found....request rejected');
    }

    referenceTitle = jsonObj.reference.title;
    //check and validates if reference title is a string
    let referenceTitleValidation = this.stringValidation(referenceTitle);
    if (referenceTitleValidation === false)
      return referenceTitleValidation + " reference title should be a string";

    referencePages = jsonObj.reference.pages;
    //check and validates if reference pages is a number 
    let referencePagesValidation = this.numberValidation(referencePages);
    if (referencePagesValidation === false) {
      return referencePagesValidation + " reference pages should be a number";
    }
    referenceYear = jsonObj.reference.year;
    //check and validates if reference year is a number 
    let referenceYearVlidation = this.numberValidation(referenceYear);
    if (referenceYearVlidation === false)
      return referenceYearVlidation + " reference year should be a number";

    referenceVolume = jsonObj.reference.volume;
    //check and validates if reference volume is a number 
    let referenceVolumeVlidation = this.numberValidation(referenceVolume);
    if (referenceVolumeVlidation === false)
      return referenceVolumeVlidation + " reference volume should be a number";

    try {
      publicationID = await this.uploadModel.insertPublication(referenceTitle, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceAuthors);
      console.log('received publicationID ' + publicationID);
    }
    catch (err) {
      console.log('publicationID was not received......rejecting request');
    }

    //check and validates if material array index contents are of string
    material = jsonObj.material;
    this.arrTypeValidationCheck(material, 'string');
    try {
      await this.uploadModel.insertMaterial(material);
      console.log('received material' + material);
    } catch (err) {
      console.log('material not found');
    }

    category = jsonObj.category;
    subcategory = jsonObj.subcategory;
    let categoryIDs = await this.uploadModel.insertCategories(category, subcategory);

    dataType = jsonObj["data type"];
    try {
      dataSetDataTypeID = await this.uploadModel.insertDataSetDataType(dataType)
      console.log('Received datasetTypeID: ' + dataSetDataTypeID);
    } catch (err) {
      console.log('error receiving datasetTypeID....request rejected');
    }

    dataSetName = jsonObj["dataset name"];
    dataSetComments = jsonObj.data.comments;
    try {
      datasetID = await this.uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, categoryIDs, material, dataSetComments)
      console.log('DatasetID received: ' + datasetID);
    } catch (err) {
      console.log('error receiving datasetID....request rejected');
    }

    //run check on variable vs contents length to see if they're equal
    if (jsonObj.data.variables.length == jsonObj.data.contents[0].point.length) {
      console.log("variable and content lengths are equal....proceed")
    } else {
      console.error('variable and content lengths dont match');
    }

    for (let i = 0; i < jsonObj.data.variables.length; i++) {

      let dataPointValues = this.getDataInformationFromContentsArray(jsonObj.data.contents, i);

      let dataVariableName = jsonObj.data.variables[i].name;
      let units = jsonObj.data.variables[i].units;
      let repr = jsonObj.data.variables[i].repr;

      try {
        unitsID = await this.uploadModel.insertUnits(units);
        console.log('added units id: ' + unitsID);
        reprID = await this.uploadModel.insertRepresentation(repr);
        console.log('added rep id: ' + reprID);
      } catch (err) {
        console.log('could not find units and representation ID....request rejected');
      }
      await this.uploadModel.insertDataPointsOfSet(datasetID, dataVariableName, dataPointValues[0], unitsID, reprID)
      individualDataSetComments = dataPointValues[1];
    }
    //check and validate the individual data set comments array content are strings
    this.arrTypeValidationCheck(individualDataSetComments, 'string');

    await this.uploadModel.insertDataPointsOfSetComments(datasetID, individualDataSetComments)

    return "Upload was successful!";
  }

  private getDataInformationFromContentsArray = (dataContentArray, index) => {

    let dataPointsForVariable = [];
    let dataSetComments = [];

    for (let i = 0; i < dataContentArray.length; i++) {
      dataPointsForVariable.push(dataContentArray[i].point[index]);
      dataSetComments.push(dataContentArray[i].comments);
    }
    //to check if the two helper arrays are empty or not
    for (let j = 0; j < dataPointsForVariable.length; j++) {
      if ((dataPointsForVariable == null || dataPointsForVariable[j] == '') ||
        (dataSetComments == null || dataSetComments[j] == '')) {
        console.log('dataset points are empty');
      } else {
        continue;
      }
    }
    let contentsArrayInfo = [dataPointsForVariable, dataSetComments];
    return contentsArrayInfo;
  }

  private checkReferenceType = (someRefType) => {
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



  private stringValidation = (reference) => {
    //basic if-else validation for checking referenceType input
    if (typeof reference === 'string' && typeof reference != null) { //to check if the type is valid and not null
      return true;
    }
    else {
      return false;
    }
  }

  private numberValidation = (reference) => {
    //basic if-else validation for checking referenceType input
    if (typeof reference === 'number' && typeof reference != null) { //to check if the type is valid and not null
      return true;
    } else {
      return false;
    }
  }

  //Function to check the types of array objects
  private arrTypeValidationCheck = (x, type) => {
    if (x.every(i => typeof (i) === type)) {
      return true;
    } else {
      return false;
    }
  }

}