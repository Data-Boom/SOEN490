const fileUploadService = require('../services/fileUploadService');


const createRequest = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty. Add content!"
    });
  }
 // callFileUploadService(req, res);
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