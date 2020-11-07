var express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const fileUploadController = require('../controllers/fileUploadController');


/**
 * This route will accept a CSV file and forward to the router. It is first processed by multer middleware,
 * and the file is stored in a temporary directory called tmp/csv. This route is referred for processing by 
 * the service.
 */
router.post('/dataupload', upload.single('jsonFile'), fileUploadController.createRequest);

/**
 * This file contains the routes for a call to dataupload. Only a post method will remain, get is left for
 * testing purposes. If an API call is made to /dataupload then the request is routed to the fileUploadController
 * to continue processing of the request.
 */
//router.post('/dataupload', upload.single('csvFile'), fileUploadController.createRequest);

//File Upload Get Router
router.get('/dataupload', function (request, response) {
  // Call the controller for get
  response.status(200).json("upload endpoint is reached!");
});

router.get('/note', function (req, res) {
  res.status(200).json("L, did you know Shinigami love apples?");
});

module.exports = router;