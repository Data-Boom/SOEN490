import { NextFunction, Response, Router } from 'express';

import { JWTAuthenticator } from '../middleware/JWTAuthenticator';
import { FileParserController } from '../controllers/FileParserController';
import multer from 'multer';
import { MulterRequest } from '../genericInterfaces/FileParserInterfaces';

let upload = multer({ dest: 'upload', limits: { fileSize: 8000000 } });

/**
 * This route will accept a file and forward to the router. It is first processed by multer middleware,
 * and the file is stored in a temporary directory called upload/. This route is referred for processing by 
 * the service.
 */
let router = Router();

router.post('/api/v1/fileParser', [JWTAuthenticator.verifyJWT, upload.single('file')], (request: MulterRequest, response: Response, next: NextFunction) => {
  try {
    let dataExtract = new FileParserController();
    dataExtract.createRequest(request, response);
  } catch (error) {
    if (!request.file)
      return response.json('Please select a file to upload');
  }
})

export { router as fileParserRoute };