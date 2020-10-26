const Parser = require('csv-parse');
const Multer = require('multer');
const fileSystem = require('fs');

//TODO: Run this code else research 3rd party lib
//var Upload = require('../models/FileUploadModel');
// Setup model for this controller to fetch data - will be updated when working on this story



/**
 * The methods in this class are only responsible for processing uploaded files. Input will be parsed 
 * then stored into its appropriate table in the database. 
 */

const processUpload = async (dataToProcess) => {
    console.log(dataToProcess);
    this.dataToProcess = dataToProcess;
    //this.parseCSVFile(dataToProcess);
}


const parseCSVFile = async (sourceFilePath, columns, onNewRecord, handleError, done) => {
    var source = fileSystem.createReadStream(sourceFilePath);
  
    var linesRead = 0;
  
    var parser = Parser({
        delimiter: ',', 
        columns:columns
    });
  
    parser.on("readable", function(){
        var record;
        while (record = parser.read()) {
            linesRead++;
            onNewRecord(record);
        }
    });
  
    parser.on("error", function(error){
        handleError(error)
    });
  
    parser.on("end", function(){
        done(linesRead);
    });
  
    source.pipe(parser);
  }
  
  //We will call this once Multer's middleware processed the request
  //and stored file in req.files.fileFormFieldName
  
  const parseFile = async (req, res, next) => {
    var filePath = req.files.file.path;
    console.log(filePath);
    function onNewRecord(record){
        console.log(record)
    }
  
    function onError(error){
        console.log(error)
    }
  
    function done(linesRead){
        res.send(200, linesRead)
    }
  
    var columns = true; 
    parseCSVFile(filePath, columns, onNewRecord, onError, done);
  }
  
  //this is the route handler with two middlewares. 
  //First:  Multer middleware to download file. At some point,
  //this middleware calls next() so process continues on to next middleware
  //Second: use the file as you need
  // app.post('/upload', [Multer({dest:'./uploads'}), parseFile]);

module.exports = {
    parseFile, parseCSVFile, processUpload
}