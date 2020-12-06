import { sign } from 'crypto';
import { Request, Response, Router } from 'express';
import { AuthenticationService } from '../services/authenticationService';
import { AuthenticationController } from '../controllers/authenticationController'

let router = Router();

let authenticationController = new AuthenticationController;

/**
 * This route is used when an authentication API is called.
 */

router.post('/signup', async (request: Request, response: Response) => {

    authenticationController.createSignUpRequest(request, response);


    // let signUp = new AuthenticationService();
    // await signUp.processSignUp(request.query);
    // response.status(200).send('success');
});

router.post('/login', async (request: Request, response: Response) => {

    authenticationController.createLoginRequest(request, response);

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