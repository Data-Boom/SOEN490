
import { Request, Response, Router, NextFunction } from 'express';
import multer from 'multer';
import { fileUploadController } from '../controllers/fileUploadController';

interface MulterRequest extends Request {
  file: any;
}

let upload = multer({ dest: 'tmp/upload/', limits: { fileSize: 8000000 } });
let router = Router();

/**
 * This route will accept a file and forward to the router. It is first processed by multer middleware,
 * and the file is stored in a temporary directory called tmp/json. This route is referred for processing by 
 * the service.
 */
router.post('/dataupload', upload.single('file'), (request: MulterRequest, response: Response, next: NextFunction) => {
  try {
    let fileUpload = new fileUploadController(request.file.path);
    fileUpload.createRequest(request, response);
  } catch (e) {
    response.status(400).send(e.message);
  }
});

//File Upload Get Router
router.get('/dataupload', (request: Request, response, Response) => {
  // Call the controller for get
  response.status(200).json("upload endpoint is reached!");
});

router.get('/note', (request: Request, response: Response) => {

  response.status(200).json("L, did you know Shinigami love apples?");
});

export { router as fileUploadRouter };