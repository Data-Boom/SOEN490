import { NextFunction, Request, Response, Router } from 'express';

import { DimensionsController } from '../controllers/DimensionsController'
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

let dimensionsController = new DimensionsController();

/**
 * This route is used when dealing with dimensions and units.
 */

// router.post('/api/v1/dimensions', JWTAuthenticator.verifyRoot, async (request: Request, response: Response, next: NextFunction) => {
router.post('/api/v1/dimensions', async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.createDimension(request, response, next);
});

router.get('/api/v1/dimensions', (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.retrieveDimensions(request, response, next);
});

// router.put('/api/v1/dimensions', JWTAuthenticator.verifyRoot, async (request: Request, response: Response, next: NextFunction) => {
router.put('/api/v1/dimensions', async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.updateDimension(request, response, next);
});

// router.delete('/api/v1/dimensions', JWTAuthenticator.verifyRoot, async (request: Request, response: Response, next: NextFunction) => {
router.delete('/api/v1/dimensions', async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.deleteDimension(request, response, next);
});

export { router as dimensionsRouter }

