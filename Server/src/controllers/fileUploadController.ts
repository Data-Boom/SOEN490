const fileUploadService = require('../services/fileUploadService');

/**
 * The fileUploadController is resposible for providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success. The fileUploadController 
 * creates a request for the fileUploadService to process, only passing the path of the CSV.
 */

const createRequest = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Nothing to process"
    });
  }
  else {
    try {
      console.log(req.body);
      console.log(req.file);
      res.status(200).send("Sucess");
    } catch (error) {
      res.status(502).send(error);
    }
  }
}

const callFileUploadService = async (filePathOfCSV, res) => {
  const fileServiceResponse = await fileUploadService.processUpload(filePathOfCSV);
  res.status(201).send(fileServiceResponse);
}

module.exports = {
  callFileUploadService, createRequest
}