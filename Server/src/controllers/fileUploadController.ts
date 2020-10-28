const fileUploadService = require('../services/fileUploadService');


/**
 * The fileUploadController is resposible for providing instructions to the application if a request comes in
 * to the /dataupload api. This controller will call the Service for appropriate processing of the input. The
 * controller is resposible for providing a response back to the Client on success.
 */

const createRequest = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty. Add content!"
    });
  }
  //callFileUploadService(req, res);
}

const callFileUploadService = async (req, res) => {
    try {
      const fileServiceResponse = await fileUploadService.processUpload( req.body );
      return res.send( fileServiceResponse );
    } catch ( err ) {
      res.status( 500 ).send( err );
    }
}
//
module.exports = {
  callFileUploadService, createRequest
}