import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { getDataController } from '../controllers/getDataController';

/**
 * This file contains the route for a call to query or obtain one or more data sets. 
 * If an API call is made to /dataset* then the request is routed to the getDataController
 * to continue processing of the request.
 */

let router = Router();

/**
 * This route needs a user ID in its query param to be able to find the user in database
 * Once user has been found, it returns a JSONified version of the saved datasets and the user's ID
 */
router.get('/datasets', (request: Request, response: Response) => {
    let userID = request.query.userID;
    let connection = getConnection();
    try {
        let userDataSets = await connection.manager.createQueryBuilder(User, 'user').select(DataSets, 'datasets').where('user.id = :id', { id: userID }).getMany();
        if (userDataSets.length == 0) {
            response.status(200).json({ id: userID, savedData: userDataSets });
        }
        else {
            response.status(400).json("User does not have any saved datasets");
        }
    }
    catch (error) {
        response.status(400).json("User was not found");
    }
});

router.get('/dataset*', (request: Request, response: Response) => {
    let getDataControllerObject = new getDataController();
    getDataControllerObject.createRequestForData(request, response);
});

export { router as getDataRouter };