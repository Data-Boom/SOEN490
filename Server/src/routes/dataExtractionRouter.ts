
import { Request, Response, Router, NextFunction } from 'express';
import multer from 'multer';
import { dataExtractionController } from '../controllers/dataExtractionController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

interface MulterRequest extends Request {
  file: any;
}

let upload = multer({ dest: 'upload', limits: { fileSize: 8000000 } });
let router = Router();

/**
 * This route will accept a file and forward to the router. It is first processed by multer middleware,
 * and the file is stored in a temporary directory called tmp/json. This route is referred for processing by 
 * the service.
 */
router.post('/api/v1/dataExtract', [JWTAuthenticator.verifyJWT, upload.single('file')], (request: MulterRequest, response: Response, next: NextFunction) => {
  try {
    let dataExtract = new dataExtractionController(request.file.path, request.file.originalname);
    dataExtract.createRequest(request, response);
  } catch (error) {
    if (!request.file) {
      return response.send('Please select a file to upload');
    }
  }
});

export { router as dataExtractionRouter };