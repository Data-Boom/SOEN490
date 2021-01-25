import { Request, Response, Router } from 'express';
import { GraphsController } from '../controllers/GraphsController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

/**
 * This file contains the route for a call to obtain a single saved graph or all of
 * the saved graphs of a particular user. 
 */

let router = Router();
let savedGraphsControllerObject = new GraphsController();

router.get('/api/v1/oneSavedGraph/:oneSavedGraph', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForSingleGraph(request, response);
});

router.get('/api/v1/userSavedGraphs$', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForUserSavedGraphs(request, response);
});

router.put('/api/v1/graphStateAPI$', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForUpdatingGraph(request, response);
});

router.post('/api/v1/addSavedGraph$', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForAddingGraph(request, response);
});

router.delete('/api/v1/deleteSavedGraph/:deleteSavedGraph', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForDeletingGraph(request, response);
});

export { router as GraphsRouter };