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
});

router.post('/login', async (request: Request, response: Response) => {

    authenticationController.createLoginRequest(request, response);
});

router.get('/resetPassword', (request: Request, response: Response) => {

})

export { router as authenticationRouter }