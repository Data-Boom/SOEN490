const fileSystem = require('fs');
const uploadModel = require('../models/DataUploadModel');


/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */

const processUpload = async (filePathOfJson) => {

  let response = jsonUpload(filePathOfJson);
  return response;
}

const jsonUpload = async (filePathOfJson) => {

  let category = '';
  let subcategory = '';
  let dataSetName = '';
  let dataType = '';
  let dataSetComments = '';
  let dataPointVariable = '';
  let dataSetValues = [];
  let material = [];
  let referenceType = '';
  let referencePublisher = '';
  let referenceTitle = '';
  let referenceAuthors = [];
  let referenceYear;
  let referencePages;
  let referenceVolume;
  let units = [];

  let jsonObj = (JSON.parse(fileSystem.readFileSync(filePathOfJson)));


  referenceType = checkReferenceType(jsonObj.reference.type);
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

    let dataPointValues = getDataPointsForVariable(jsonObj.data.contents, i);
    let dataVariableName = jsonObj.data.variables[i].name;
    let units = jsonObj.data.variables[i].units;
    let repr = jsonObj.data.variables[i].repr;

    let unitsID = await uploadModel.insertUnits(units);
    let reprID = await uploadModel.insertRepresentation(repr);
    await uploadModel.insertDataPointsOfSet(datasetID, dataVariableName, dataPointValues, unitsID, reprID)
  }

  return "Was a success";
}

const getDataPointsForVariable = (dataPointsArray, index) => {

  let dataPointsForVariables = [];
  let dataPointsComments = '';
  for (var i = 0; i < dataPointsArray.length; i++) {
    dataPointsForVariables.push(dataPointsArray[i].point[index])
  }
  return dataPointsForVariables;
}

const checkReferenceType = (someRefType) => {
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

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

module.exports = {
  processUpload
}