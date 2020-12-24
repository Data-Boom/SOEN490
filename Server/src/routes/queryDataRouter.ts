import { Request, Response, Router } from 'express';
import { getDataController } from '../controllers/getDataController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /dataset* then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();

router.get('/dataset/uploadedBy/:uploadedBy', (request: Request, response: Response) => {
    let getDataControllerObject = new getDataController();
    getDataControllerObject.createRequestForUserUploads(request, response);
});

router.get('/dataset/favoritesOf/:favoritesOf', (request: Request, response: Response) => {
    let getDataControllerObject = new getDataController();
    getDataControllerObject.createRequestForUserFavorites(request, response);
});

router.get('/dataset*', (request: Request, response: Response) => {
    let getDataControllerObject = new getDataController();
    getDataControllerObject.createRequestForData(request, response);
});

export { router as getDataRouter };