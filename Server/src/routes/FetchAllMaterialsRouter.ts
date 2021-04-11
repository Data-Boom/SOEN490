import { Request, Response, Router } from 'express';
import { FetchAllMaterialsController } from '../controllers/FetchAllMaterialsController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /category$ /subcategory$ or /material$ then the request is routed to the 
 * getBasicDataController to continue processing of the request.
 */

let router = Router();

router.get('/material$', (request: Request, response: Response) => {
    let FetchAllMaterialsControllerObject = new FetchAllMaterialsController();
    FetchAllMaterialsControllerObject.createRequestForAllMaterials(request, response);
});

export { router as FetchAllMaterialsRouter };