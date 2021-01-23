import { Request, Response, Router } from 'express';
import { GraphsController } from '../controllers/GraphsController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

/**
 * This file contains the route for a call to obtain a single saved graph or all of
 * the saved graphs of a particular user. 
 */

let router = Router();
let savedGraphsControllerObject = new GraphsController();


//[JWTAuthenticator.verifyJWT,JWTAuthenticator.verifyAdmin]
router.get('/api/v1/savedGraphs/oneSavedGraph/:oneSavedGraph', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForSingleSavedGraph(request, response);
});

router.get('/api/v1/userSavedGraphs/:userSavedGraphs', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForUserSavedGraphs(request, response);
});

router.post('/api/v1/addSavedGraph', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForAddingSavedGraph(request, response);
});

router.delete('/api/v1/deleteSavedGraph/:deleteSavedGraph', JWTAuthenticator.verifyJWT, (request: Request, response: Response) => {
    savedGraphsControllerObject.createRequestForDeletingSavedGraph(request, response);
});

export { router as GraphsRouter };