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

router.get('/api/v1/uploadedDatasets', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataSetController.createRequestForUserUploadedDatasets(request, response);
});

router.get('/api/v1/favoriteDatasets', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataSetController.createRequestForUserFavoriteDatsets(request, response);
});

router.post('/api/v1/favoriteDatasets/:datasetId', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataSetController.createRequestToAddUserFavoriteDataSet(request, response);
});

router.delete('/api/v1/favoriteDatasets/:datasetId', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataSetController.createRequestToDeleteUserFavoriteDataSet(request, response);
});

//TODO: Rename route name to /api/v1/unapprovedDatasets to bring it in line with current standard
router.get('/api/v1/dataset/fetchUnapprovedDatasets$', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyAdmin], (request: Request, response: Response) => {
    dataSetController.createRequestForUnapprovedDatsets(request, response);
});

router.get('/api/v1/dataset*', (request: Request, response: Response) => {
    dataSetController.createRequestForData(request, response);
});

router.delete('/api/v1/dataset/:datasetId', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataSetController.createRequestToRejectDataset(request, response)
})

router.put('/api/v1/flagDataSet', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyAdmin], (request: Request, response: Response) => {
    dataSetController.createRequestToFlagDataset(request, response)
})

router.get('/api/v1/userFlaggedDatasets', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataSetController.createRequestForUserFlaggedDatasets(request, response)
})

router.put('/api/v1/approveDataset/:datasetId', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataSetController.createUserApprovedDatasetRequest(request, response)
})

router.put('/api/v1/approveDataset', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyAdmin], (request: Request, response: Response) => {
    dataSetController.createAdminApprovedDatasetRequest(request, response)
})
//router for fetching datapoint names
router.get('/api/v1/datapointName s', (request: Request, response: Response) => {
    //add controller method for datapoints
})

export { router as DataSetRouter };