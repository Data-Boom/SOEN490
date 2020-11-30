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
  let referencePublisher:string = '';
  let referenceTitle = 'hello';
  let referenceAuthors = [];
  let referenceYear;
  let referencePages;
  let referenceVolume;
  let referenceTypeID='';
  let publisherNameId='';
  let publicationID='';
  let dataSetDataTypeID ='';
  let datasetID='';
  let unitsID = '';
  let reprID = '';

  let jsonObj = (JSON.parse(fileSystem.readFileSync(filePathOfJson)));
  
  //checks and validates if reference type is a string and handles error--
  referenceType = checkReferenceType(jsonObj.reference.type);
  
  let referenceTypeValidation = stringValidation(referenceType);
  if(referenceTypeValidation === false)
    return referenceTypeValidation + " reference type should be a string";

try{
    referenceTypeID = await uploadModel.insertReferenceType(referenceType);
    console.log('Received reference ID'+ referenceTypeID);
    }catch(err){
    console.log('rejected request for referenceTypeID');
    }

  //checks and validates if reference publisher is a string and handles error--
    referencePublisher = jsonObj.reference.publisher;

  let referencePublisherValidation = stringValidation(referencePublisher);
  if(referencePublisherValidation === false)
    return referencePublisherValidation + " reference publisher should be a string";
try{
   publisherNameId = await uploadModel.insertPublisher(referencePublisher);
   console.log('Received publisher name ID'+ publisherNameId);
 }catch(err){
    console.log('rejected request for inserting publisherNameId')
 }

  //checks and validates if ref authors are strings and handles error--
  referenceAuthors = jsonObj.reference.authors;
  arrTypeValidationCheck(referenceAuthors, 'string');
try{
  await uploadModel.insertAuthors(referenceAuthors);
  console.log('reference authors: '+ referenceAuthors);
 }catch(err){
   console.log('reference authors not found....request rejected');
 }

  referenceTitle = jsonObj.reference.title;
   //check and validates if reference title is a string
   let referenceTitleValidation = stringValidation(referenceTitle);
   if(referenceTitleValidation === false)
    return referenceTitleValidation + " reference title should be a string";

  referencePages = jsonObj.reference.pages;
   //check and validates if reference pages is a number 
   let referencePagesValidation = numberValidation(referencePages);
    if (referencePagesValidation === false){
    return referencePagesValidation + " reference pages should be a number";
    } 
  referenceYear = jsonObj.reference.year;
  //check and validates if reference year is a number 
  let referenceYearVlidation = numberValidation(referenceYear);
  if(referenceYearVlidation === false)
    return referenceYearVlidation + " reference year should be a number";

  referenceVolume = jsonObj.reference.volume;
  //check and validates if reference volume is a number 
  let referenceVolumeVlidation = numberValidation(referenceVolume);
  if(referenceVolumeVlidation === false)
    return referenceVolumeVlidation + " reference volume should be a number";

  try{
   publicationID = await uploadModel.insertPublication(referenceTitle, referencePages, referenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceAuthors);
   console.log('received publicationID '+ publicationID);
   }
   catch(err){
     console.log('publicationID was not received......rejecting request');
   }

  //check and validates if material array index contents are of string
  material = jsonObj.material;
  arrTypeValidationCheck(material, 'string');
  try{
   await uploadModel.insertMaterial(material);
   console.log('received material'+ material);
   }catch(err){
     console.log('material not found');
   }

  // category = jsonObj.category;
  // subcategory = jsonObj.subcategory;
  // let categoryIDs = await uploadModel.insertCategories(category, subcategory);

  dataType = jsonObj["data type"];
  try{
    dataSetDataTypeID = await uploadModel.insertDataSetDataType(dataType)
    console.log('Received datasetTypeID: '+ dataSetDataTypeID);
   } catch(err){
     console.log('error receiving datasetTypeID....request rejected');
   }

  dataSetName = jsonObj["dataset name"];
  dataSetComments = jsonObj.data.comments;
  try{ 
    datasetID = await uploadModel.insertFullDataSet(dataSetName, dataSetDataTypeID, publicationID,/** categoryIDs, */ material, dataSetComments)
    console.log('DatasetID received: '+datasetID);
   }catch(err){
     console.log('error receiving datasetID....request rejected');
   }
  
  for (var i = 0; i < jsonObj.data.variables.length; i++) {

    let dataPointValues = getDataInformationFromContentsArray(jsonObj.data.contents, i);
    let dataVariableName = jsonObj.data.variables[i].name;
    let units = jsonObj.data.variables[i].units;
    let repr = jsonObj.data.variables[i].repr;

    try{
    unitsID = await uploadModel.insertUnits(units);
      console.log('added units id: '+ unitsID);
    reprID = await uploadModel.insertRepresentation(repr);
      console.log('added rep id: '+ reprID);    
     }catch(err){
       console.log('could not find units and representation ID....request rejected');
     }
    await uploadModel.insertDataPointsOfSet(datasetID, dataVariableName, dataPointValues[0], unitsID, reprID)
    individualDataSetComments = dataPointValues[1]; 
  }
  //check and validate the individual data set comments array content are strings
  arrTypeValidationCheck(individualDataSetComments,'string');

  await uploadModel.insertDataPointsOfSetComments(datasetID, individualDataSetComments)

  return "Upload was successful!";
}

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
const stringValidation =(reference) =>{
  //basic if-else validation for checking referenceType input
  
  if(typeof reference === 'string' && typeof reference != null){ //to check if the type is valid and not null
    return true;  
  }
  else{
return false;
  }
}


const numberValidation =(reference) =>{
  //basic if-else validation for checking referenceType input
  
  if(typeof reference === 'number' && typeof reference != null){ //to check if the type is valid and not null
    return true;  
  }else{
return false;
  }
}

//Function to check the types of array objects
const arrTypeValidationCheck=(x, type) => {
  if( x.every(i => typeof (i) === type)){ 
    return true;
  }else
    return false;
}