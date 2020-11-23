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
  referenceType = checkReferenceType(jsonObj.reference.type);

  //check and validates if reference type is a string
  validation(referenceType, 'string');

  let referenceTypeID = await uploadModel.insertReferenceType(referenceType);

  referencePublisher = jsonObj.reference.publisher;

  //check and validates if reference publisher is a string
  validation(referencePublisher, 'string');

  let publisherNameId = await uploadModel.insertPublisher(referencePublisher);

  referenceAuthors = jsonObj.reference.authors;

  await uploadModel.insertAuthors(referenceAuthors);

  referenceTitle = jsonObj.reference.title;
   //check and validates if reference title is a string
   validation(referenceTitle, 'string');

  referencePages = jsonObj.reference.pages;
   //check and validates if reference pages is a number
   validation(referencePages, 'number');

  referenceYear = jsonObj.reference.year;
  //check and validates if reference year is a number
  validation(referenceYear, 'number');

  referenceVolume = jsonObj.reference.volume;
  //check and validates if reference volume is a number
  validation(referenceVolume, 'number');

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

    let dataPointValues = getDataInformationFromContentsArray(jsonObj.data.contents, i);
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
//-----------------------------------------helper functions-----------------------------
const getDataInformationFromContentsArray = (dataContentArray, index) => {

  let dataPointsForVariable = [];
  let dataSetComments = [];

  for (var i = 0; i < dataContentArray.length; i++) {
    dataPointsForVariable.push(dataContentArray[i].point[index]);
    dataSetComments.push(dataContentArray[i].comments);
  }
  let contentsArrayInfo = [dataPointsForVariable, dataSetComments];
  return contentsArrayInfo;
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
const validation =(reference, type) =>{
   /**
   * if(refType is a string ){
   *    return;
   * }else
   *  alert('wrong input, try again') or return  reftype = null
   */

  //basic if-else validation for checking referenceType input
  
  if(typeof reference == type ){
    console.log('proper input: ' + reference);  
  }else
    alert('wrong input, try again');
}

// const validation2 =(reference, type) =>{
//  //if we have empty inputs/values
//  if(typeof reference == type ){
//    console.log('proper input: ' + reference);  
//  }else
//    reference= null;
// }