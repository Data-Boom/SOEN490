import { Request, Response, Router } from 'express';
import { AuthenticationController } from '../controllers/authenticationController'

let router = Router();

let authenticationController = new AuthenticationController;

/**
 * This route is used when an authentication API is called.
 */

router.post('/signup', (request: Request, response: Response) => {

    authenticationController.createSignUpRequest(request, response);
});

router.post('/login', (request: Request, response: Response) => {

    authenticationController.createLoginRequest(request, response);
});

router.get('/resetPassword', (request: Request, response: Response) => {

})

export { router as authenticationRouter }