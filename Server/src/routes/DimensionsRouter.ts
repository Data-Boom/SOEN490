import { NextFunction, Request, Response, Router } from 'express';

import { DimensionsController } from '../controllers/DimensionsController'
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

let dimensionsController = new DimensionsController();

/**
 * This route is used when dealing with dimensions and units.
 */

// router.post('/api/v1/dimensions', JWTAuthenticator.verifyRoot, async (request: Request, response: Response, next: NextFunction) => {
router.post('/api/v1/dimensions', async (request: Request, response: Response) => {
  dimensionsController.createDimension(request, response);
});

router.get('/api/v1/dimensions', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyRoot], (request: Request, response: Response) => {
  dimensionsController.retrieveDimensions(request, response);
});

// router.put('/api/v1/dimensions', JWTAuthenticator.verifyRoot, async (request: Request, response: Response, next: NextFunction) => {
router.put('/api/v1/dimensions', async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.updateDimension(request, response, next);
});

// router.delete('/api/v1/dimensions', JWTAuthenticator.verifyRoot, async (request: Request, response: Response, next: NextFunction) => {
router.delete('/api/v1/dimensions/:id?', async (request: Request, response: Response, next: NextFunction) => {
  dimensionsController.deleteDimension(request, response, next);
});

export { router as dimensionsRouter }

