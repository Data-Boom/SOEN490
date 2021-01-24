import { Request, Response, Router } from 'express';
import { DataSetController } from '../controllers/DataSetController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /dataset* then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();
let dataSetController = new DataSetController();

//Note to Self: Verify which of these routes are protected 
// JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyAdmin
router.get('/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets', (request: Request, response: Response) => {
    dataSetController.createRequestForUserUploadedDatasets(request, response);
});

router.get('/api/v1/dataset/userSavedDatsets/:userSavedDatsets', (request: Request, response: Response) => {
    dataSetController.createRequestForUserSavedDatsets(request, response);
});

router.get('/api/v1/dataset/fetchUnapprovedDatasets$', (request: Request, response: Response) => {
    dataSetController.createRequestForUnapprovedDatsets(request, response);
});

router.get('/api/v1/dataset*', (request: Request, response: Response) => {
    dataSetController.createRequestForData(request, response);
});

router.delete('/api/v1//dataset/:dataSetId', (request: Request, response: Response) => {
    dataSetController.createRequestToDeleteDataSet(request, response)
})

router.get('/api/v1/flagDataSet', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyAdmin], (request: Request, response: Response) => {
    dataSetController.createRequestToFlagDataSet(request, response)
})

export { router as DataSetRouter };