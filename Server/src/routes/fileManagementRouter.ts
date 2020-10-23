var express = require('express');
var router = express.Router();


//File Upload Post Router
router.post('/dataupload', function(request, response)  {
        // Call the controller for post
});

//File Upload Get Router
router.get('/dataupload', function(request, response)  {
    // Call the controller for get
    response.status(200).json("upload endpoint is reached!");
});

module.exports = router;