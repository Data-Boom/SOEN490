const fileSystem = require('fs');

import { BadRequest } from '@tsed/exceptions';
import { DataUploadModel } from '../models/DataUploadModel'
import { IAuthors } from '../models/interfaces/AuthorsInterface';
import { IMaterials } from '../models/interfaces/MaterialsInterface';
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

    let jsonObj: any = (JSON.parse(fileSystem.readFileSync(filePathOfJson)));

    try {
      await validationSchema.validate(jsonObj)
    }
    catch (err) {
      throw new BadRequest(err.message);
    }

    // Create this object after the parsing passes
    this.uploadModel = new DataUploadModel();

    referenceType = jsonObj.reference.type;
    try {
      referenceTypeID = await this.uploadModel.insertReferenceType(referenceType);
      console.log('Received reference ID' + referenceTypeID);
    } catch (err) {
      console.log('rejected request for referenceTypeID');
    }

    referencePublisher = jsonObj.reference.publisher;
    try {
      publisherNameId = await this.uploadModel.insertPublisher(referencePublisher);
      console.log('Received publisher name ID' + publisherNameId);
    } catch (err) {
      console.log('rejected request for inserting publisherNameId')
    }

    referenceAuthors = jsonObj.reference.authors;
    try {
      await this.uploadModel.insertAuthors(referenceAuthors);
      console.log('reference authors: ' + referenceAuthors);
    } catch (err) {
      console.log('reference authors not found....request rejected');
    }

    referenceTitle = jsonObj.reference.title;
    referencePages = jsonObj.reference.pages;
    referenceYear = jsonObj.reference.year;
    referenceVolume = jsonObj.reference.volume;

    try {
      publicationID = await this.uploadModel.insertPublication(referenceTitle, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceAuthors);
      console.log('received publicationID ' + publicationID);
    }
    catch (err) {
      console.log('publicationID was not received......rejecting request');
    }

    material = jsonObj.material;
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

    await this.uploadModel.insertDataPointsOfSetComments(datasetID, individualDataSetComments)

    return "Upload was successful!";
  }

  private getDataInformationFromContentsArray = (dataContentArray, index) => {

    let dataPointsForVariable = [];
    let dataSetComments = [];
    //Variable to use in if statement below to check if all the points have the same length as the first point in contents field
    let pointsMaxLength = dataContentArray[0].point[0].length;

    for (let i = 0; i < dataContentArray.length; i++) {
      if (dataContentArray[i].point[index] === pointsMaxLength) {
        dataPointsForVariable.push(dataContentArray[i].point[index]);
        dataSetComments.push(dataContentArray[i].comments);
      } else {
        console.log("Points lengths are not the same")
      }
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

}