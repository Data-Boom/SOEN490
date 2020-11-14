const fileUploadService = require('../services/fileUploadService');
const fs = require('fs');
/**
 * The fileUploadController is resposible for providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the JSON.
 */


const createRequest = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Nothing to process"
    });
  }
  else {
    try {
      callFileUploadService(req.file.path, res);
    } catch (error) {
      console.error(error)
    }
  }
}

const callFileUploadService = async (filePathOfJson, res) => {
  const fileServiceResponse = await fileUploadService.processUpload(filePathOfJson);
  if (fileServiceResponse.status == 400) {
    res.status(400).send(fileServiceResponse);
  }
  else {
    res.status(200).send(fileServiceResponse);
  }
}

module.exports = {
  callFileUploadService, createRequest
}