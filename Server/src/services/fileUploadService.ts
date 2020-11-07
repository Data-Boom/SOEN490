const csvFile = require('fast-csv');
const fileSystem = require('fs');


//TODO: Run this code else research 3rd party lib
//var Upload = require('../models/FileUploadModel');
// Setup model for this controller to fetch data - will be updated when working on this story

/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */

const processUpload = async (filePathOfJson) => {

  const fileData = [];

  let jsonObj = (JSON.parse(fs.readFileSync(filePathOfJson)));
  console.log(jsonObj.data.variables);
  fileData.push(jsonObj.data.variables);

  return fileData;
}

module.exports = {
  processUpload
}