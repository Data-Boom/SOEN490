import { sign } from 'crypto';
import { Request, Response, Router } from 'express';
import { AuthenticationService } from '../services/authenticationService';
import { AuthenticationController } from '../controllers/authenticationController'

let router = Router();

/**
 * This route is used when an authentication API is called.
 */

router.post('/signup', async (request: Request, response: Response) => {

    let command: string = "signup";
    let authenticationController = new AuthenticationController;
    authenticationController.createRequest(request, response, command);


    // let signUp = new AuthenticationService();
    // await signUp.processSignUp(request.query);
    // response.status(200).send('success');
});

router.post('/login', async (request: Request, response: Response) => {

    let command: string = "login";
    let authenticationController = new AuthenticationController;
    authenticationController.createRequest(request, response, command);

    // let login = new AuthenticationService();
    // let serviceResponse: any = await login.checkLoginCredentials(request.query);
    // if (serviceResponse.statusCode == 200) {
    //     response.send(serviceResponse);
    // }
    // else
    //     response.status(401).json({
    //         status: "Failure",
    //         errorMessage: serviceResponse
    //     })

});

router.get('/refresh', (request: Request, response: Response) => {

});

export { router as authenticationRouter }