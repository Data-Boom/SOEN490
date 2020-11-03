 const csvFile = require('fast-csv');
 const fileSystem = require('fs');

 
//TODO: Run this code else research 3rd party lib
//var Upload = require('../models/FileUploadModel');
// Setup model for this controller to fetch data - will be updated when working on this story

/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */

const processUpload = async (filePathOfCSV) => {

    const fileRows = [];
  
     await csvFile.parseFile(filePathOfCSV)
      .on("data", function (data) {
        fileRows.push(data);
      })
      .on("end", function () {
        console.log(fileRows)
        fileSystem.unlinkSync(filePathOfCSV); 
      })
      return fileRows; 
}

module.exports = {
     processUpload
}