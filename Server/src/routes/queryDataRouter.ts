import { Request, Response, Router } from 'express';
import { getDataController } from '../controllers/getDataController';

/**
 * This file contains the routes for a call to query or obtain a dataset. 
 * If an API call is made to /getData then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();

router.get('/dataset*', (request: Request, response, Response) => {
    let getDataControllerObject = new getDataController();
    getDataControllerObject.createRequestForData(request, response);
});

export { router as getDataRouter };