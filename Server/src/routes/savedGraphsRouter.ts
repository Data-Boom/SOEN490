import { Request, Response, Router } from 'express';
import { savedGraphsController } from '../controllers/savedGraphsController';

/**
 * This file contains the route for a call to obtain a single saved graph or all of
 * the saved graphs of a particular user. 
 */

let router = Router();

router.get('/api/v1/savedgraphs/oneSavedGraph/:oneSavedGraph', (request: Request, response: Response) => {
    let savedGraphsControllerObject = new savedGraphsController();
    savedGraphsControllerObject.createRequestForOneSavedGraph(request, response);
});

router.get('/api/v1/userSavedGraphs/:userSavedGraphs', (request: Request, response: Response) => {
    let savedGraphsControllerObject = new savedGraphsController();
    savedGraphsControllerObject.createRequestForUserSavedGraphs(request, response);
});

router.post('/api/v1/addSavedGraph/', (request: Request, response: Response) => {
    let savedGraphsControllerObject = new savedGraphsController();
    savedGraphsControllerObject.createRequestForAddingSavedGraph(request, response);
});

router.delete('/api/v1/deleteSavedGraph/:deleteSavedGraph', (request: Request, response: Response) => {
    let savedGraphsControllerObject = new savedGraphsController();
    savedGraphsControllerObject.createRequestForDeletingSavedGraph(request, response);
});

export { router as savedGraphsRouter };