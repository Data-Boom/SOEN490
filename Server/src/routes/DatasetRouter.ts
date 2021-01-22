import { Request, Response, Router } from 'express';
import { DataSetController } from '../controllers/DataSetController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /dataset* then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();
let getDataControllerObject = new DataSetController();

router.get('/api/v1/dataset/userUploadedDatasets/:userUploadedDatasets', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForUserUploadedDatasets(request, response);
});

router.get('/api/v1/dataset/userSavedDatsets/:userSavedDatsets', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForUserSavedDatsets(request, response);
});

router.get('/api/v1/dataset/fetchUnapprovedDatasets$', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForUnapprovedDatsets(request, response);
});

router.get('/api/v1/dataset*', (request: Request, response: Response) => {
    getDataControllerObject.createRequestForData(request, response);
});

router.delete('/api/v1//dataset/:dataSetId', (request: Request, response: Response) => {
    getDataControllerObject.createRequestToDeleteDataSet(request, response)
})

router.get('/dataset', (request: Request, response: Response) => {
    getDataControllerObject.createRequestToDeleteDataSet(request, response)
})

export { router as DataSetRouter };