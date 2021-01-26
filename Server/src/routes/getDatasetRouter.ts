import { Request, Response, Router } from 'express';

import { getDataController } from '../controllers/getDatasetController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /dataset* then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();
let getDataControllerObject = new getDataController();

router.get('/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForUserUploadedDatasets(request, response);
});

router.get('/api/v1/dataset/userSavedDatsets/:userSavedDatsets', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForUserSavedDatsets(request, response);
});

router.post('/api/v1/dataset/addSavedDatset/:userEmail/:datasetId', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForAddingSavedDataset(request, response);
});

router.delete('/api/v1/dataset/removeSavedDatset/:userEmail/:datasetId', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForRemovingSavedDataset(request, response);
});

router.get('/api/v1/dataset*', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForData(request, response);
});

export { router as getDataRouter };