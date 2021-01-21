import { Request, Response, Router } from 'express';
import { fetchSavedGraphsController } from '../controllers/fetchSavedGraphsController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /dataset* then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();

router.get('/savedgraphs/oneSavedGraph/:oneSavedGraph', (request: Request, response: Response) => {
    let fetchSavedGraphsControllerObject = new fetchSavedGraphsController();
    fetchSavedGraphsControllerObject.createRequestForOneSavedGraph(request, response);
});

router.get('/savedgraphs/userSavedGraphs/:userSavedGraphs', (request: Request, response: Response) => {
    let fetchSavedGraphsControllerObject = new fetchSavedGraphsController();
    fetchSavedGraphsControllerObject.createRequestForUserSavedGraphs(request, response);
});

export { router as fetchSavedGraphsRouter };