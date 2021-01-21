
import { Request, Response, Router, NextFunction } from 'express';
import { DataUploadController } from '../controllers/dataUploadController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

/**
 * This route will accept json data and forward to the controller to verify request. 
 */
router.post('/api/v1/dataUpload', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    let dataUpload = new DataUploadController();
    dataUpload.createRequest(request, response);
});

router.get('/api/v1/dataUpload', /**JWTAuthenticator.verifyJWT, **/(request: Request, response: Response) => {
    // console.log(testData)
});

export { router as dataUploadRouter };