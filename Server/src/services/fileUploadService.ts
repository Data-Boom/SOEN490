const fileSystem = require('fs');


//TODO: Run this code else research 3rd party lib
const uploadModel = require('../models/DataUploadModel');
// Setup model for this controller to fetch data - will be updated when working on this story

/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */

const processUpload = async (filePathOfJson) => {

  let response = jsonUpload(filePathOfJson);
  return response;
}

const jsonUpload = async (filePathOfJson) => {

  let dataSetName = '';
  let material = [];
  let dataType = '';
  let referenceType = '';
  let referencePublisher = '';
  let referenceTitle = '';
  let referenceAuthors = [];
  let referenceYear;
  let referencePages;
  let referenceVolume;
  let dataSetComments = '';
  let data = [];

  let jsonObj = (JSON.parse(fileSystem.readFileSync(filePathOfJson)));

  referenceType = checkPreferenceType(jsonObj.reference.type);
  let preferenceTypeID = await uploadModel.insertPreferenceType(referenceType);

  referencePublisher = jsonObj.reference.publisher;
  let publisherNameId = await uploadModel.insertPublisher(referencePublisher);

  referenceAuthors = jsonObj.reference.authors;
  await uploadModel.insertAuthors(referenceAuthors);

  referenceTitle = jsonObj.reference.title;
  referencePages = jsonObj.reference.pages;
  referenceYear = jsonObj.reference.year;
  referenceVolume = jsonObj.reference.volume;
  let publicationID = await uploadModel.insertPublication(referenceTitle, referencePages, preferenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceAuthors);

  material = jsonObj.material;
  await uploadModel.insertMaterial(material);

  dataType = jsonObj["data type"];
  let dataSetDataTypeID = await uploadModel.insertDataSetDataType(dataType)

  dataSetName = jsonObj["dataset name"];
  dataSetComments = jsonObj.data.comments;

  await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID, material, dataSetComments)




  // materialName = jsonObj.material.names;
  // console.log(`Name of Material-name: ${materialName}`);


  // dataType = jsonObj["data type"];



  // materialComposition = jsonObj.material.composition.C;
  // console.log(`Name of Material-composition: ${materialComposition}`);
  // dataType = jsonObj["data type"];
  // console.log(`Name of dataType: ${dataType}`);
  // referenceType = checkReferenceType(jsonObj.reference.type);
  // console.log(`Name of referenceType: ${referenceType}`);
  // referenceTitle = jsonObj.reference.title;
  // console.log(`Name of referenceTitle: ${referenceTitle}`);
  // referenceAuthors = jsonObj.reference.authors.firstname;
  // console.log(`Name of referenceAuthors: ${referenceAuthors}`);
  // console.log(`Name of referenceAuthors: ${referenceAuthors}`);
  // console.log(`Name of referenceAuthors: ${referenceAuthors}`);
  // let dataStringed = jsonObj.data.variables;
  // console.log(`Name of data: ${dataStringed}`);

  return "Was a success";
}

const checkPreferenceType = (someRefType) => {
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

module.exports = {
  processUpload
}