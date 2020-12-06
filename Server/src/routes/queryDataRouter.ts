import { Router } from 'express';
import { createRequestForData } from '../controllers/getDataController';

/**
 * This file contains the routes for a call to query or obtain a dataset. 
 * If an API call is made to /getData then the request is routed to the getDataController
 * to continue processing of the request.
 */

let getDataRouter = Router();

getDataRouter.get('/dataset*', createRequestForData);

export { getDataRouter as getDataRouter };