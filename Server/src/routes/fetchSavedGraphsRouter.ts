import { Request, Response, Router } from 'express';
import { fetchSavedGraphsController } from '../controllers/fetchSavedGraphsController';

/**
 * This file contains the route for a call to obtain a single saved graph or all of
 * the saved graphs of a particular user. 
 */

let router = Router();

router.get('/api/v1/savedgraphs/oneSavedGraph/:oneSavedGraph', (request: Request, response: Response) => {
    let fetchSavedGraphsControllerObject = new fetchSavedGraphsController();
    fetchSavedGraphsControllerObject.createRequestForOneSavedGraph(request, response);
});

router.get('/api/v1/userSavedGraphs/:userSavedGraphs', (request: Request, response: Response) => {
    let fetchSavedGraphsControllerObject = new fetchSavedGraphsController();
    fetchSavedGraphsControllerObject.createRequestForUserSavedGraphs(request, response);
});

router.get('/api/v1/deleteSavedGraph/:deleteSavedGraph', (request: Request, response: Response) => {
    let fetchSavedGraphsControllerObject = new fetchSavedGraphsController();
    fetchSavedGraphsControllerObject.createRequestForDeletingSavedGraph(request, response);
});

export { router as fetchSavedGraphsRouter };