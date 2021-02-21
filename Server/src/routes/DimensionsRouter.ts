import { NextFunction, Request, Response, Router } from 'express';

import { DimensionsController } from '../controllers/DimensionsController'
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

let dimensionsController = new DimensionsController();

/**
 * This route is used when dealing with dimensions and units.
 * **IMPORTANT**
 * These routes are temporarily unprotected, but later need to be uncommented
 */
router.post('/api/v1/dimensions', (request: Request, response: Response) => {
  dimensionsController.createDimension(request, response);
});

router.get('/api/v1/dimensions', (request: Request, response: Response) => {
  dimensionsController.retrieveDimensions(response);
});

router.put('/api/v1/dimensions', (request: Request, response: Response) => {
  dimensionsController.updateDimension(request, response);
});

router.delete('/api/v1/dimensions/:id?', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyRoot], (request: Request, response: Response) => {
  dimensionsController.deleteDimension(request, response);
});

export { router as dimensionsRouter }

