
import { Request, Response, Router, NextFunction } from 'express';
import { dataExtractionController } from '../controllers/dataExtractionController';
import { dataUploadController } from '../controllers/dataUploadController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

/**
 * This route will accept a file and forward to the router. It is first processed by multer middleware,
 * and the file is stored in a temporary directory called tmp/json. This route is referred for processing by 
 * the service.
 */
router.post('/api/v1/dataUpload', /**[JWTAuthenticator.verifyJWT, **/(request: Request, response: Response) => {
    let dataExtract = new dataUploadController();
    dataExtract.createRequest(request, response);
});

export { router as dataUploadRouter };