var express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileUploadController');

//File Upload Post Router
router.post('/dataupload', fileUploadController.createRequest);

//File Upload Get Router
router.get('/dataupload', function(request, response)  {
    // Call the controller for get
    response.status(200).json("upload endpoint is reached!");
});

module.exports = router;