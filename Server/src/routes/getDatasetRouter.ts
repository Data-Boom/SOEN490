import { Request, Response, Router } from 'express';
import { getDataController } from '../controllers/getDatasetController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /dataset* then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();
let getDataControllerObject = new getDataController();

router.get('/dataset/userUploadedDatasets/:userUploadedDatasets', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForUserUploadedDatasets(request, response);
});

router.get('/dataset/userSavedDatsets/:userSavedDatsets', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForUserSavedDatsets(request, response);
});

router.get('/dataset*', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForData(request, response);
});

export { router as getDataRouter };