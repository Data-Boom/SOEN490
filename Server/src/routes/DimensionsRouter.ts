import { NextFunction, Request, Response, Router } from 'express';

import { DimensionsController } from '../controllers/DimensionsController'
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

let dimensionsController = new DimensionsController();

/**
 * This route is used when an authentication API is called.
 */


// User must be an admin
router.post('/api/v1/dimensions', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.createDimension(request, response, next);
});

router.get('/api/v1/dimensions', (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.retrieveDimensions(request, response, next);
});

// User must be an admin
router.put('/api/v1/dimensions', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.updateDimension(request, response, next);
});

// User must be an admin
router.delete('/api/v1/dimensions', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.deleteDimension(request, response, next);
});

export { router as dimensionsRouter }

