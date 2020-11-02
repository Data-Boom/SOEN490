const fileUploadService = require('../services/fileUploadService');
var fs = require('fs');
var csv = require('fast-csv');



/**
 * The fileUploadController is resposible for providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success.
 */

const createRequest = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Nothing to process"
    });
  }
  else
  {
    try {
      const response = await callFileUploadService(req.file.path);
      res.status(200).send(response);
    }catch(error) {
      res.status(500).send(error);
    }
  }
}

const callFileUploadService = async (filePathOfCSV) => {
      const fileServiceResponse = await fileUploadService.processUpload(filePathOfCSV);
      return fileServiceResponse;
}

module.exports = {
  callFileUploadService, createRequest
}