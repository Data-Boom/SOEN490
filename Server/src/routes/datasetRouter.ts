const datasetController = require('../controllers/datasetController');

const dataset = require('express').Router();

/**
 * This file contains the routes for a call to dataupload. Only a post method will remain, get is left for
 * testing purposes. If an API call is made to /dataupload then the request is routed to the fileUploadController
 * to continue processing of the request.
 */

dataset.get(`/dataset`, function (req: Request, res: Response) {
    //todo should be await
    datasetController.getDataset(req, res);
});

dataset.post(`/dataset`, function (req: Request, res: Response) {
    console.log(req.body)
    datasetController.createDataset(req, res);
});

module.exports = dataset