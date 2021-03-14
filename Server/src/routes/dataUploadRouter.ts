import { Request, Response, Router } from 'express';

import { DataUploadController } from '../controllers/dataUploadController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();
let dataUpload = new DataUploadController();

/**
 * This route will accept json data and forward to the controller to verify request. 
 */
router.post('/api/v1/dataUpload', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataUpload.createNewDatasetRequest(request, response);
});

router.put('/api/v1/dataUpload/:datasetId', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    dataUpload.createEditUploadRequest(request, response);
});

export { router as dataUploadRouter };