import { Request, Response, NextFunction, Router } from 'express';
import { AuthenticationController } from '../controllers/authenticationController'
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

let authenticationController = new AuthenticationController();

/**
 * This route is used when an authentication API is called.
 */

router.post('/signup', (request: Request, response: Response, next: NextFunction) => {

    authenticationController.createSignUpRequest(request, response, next);
});

router.post('/login', (request: Request, response: Response, next: NextFunction) => {

    authenticationController.createLoginRequest(request, response, next);
});

//TODO: Implement when doing password reset 
router.get('/resetPassword', (request: Request, response: Response, next: NextFunction) => {

});

router.get('/userDetails', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {

    authenticationController.createFetchUserDetailsRequest(request, response);
});

export { router as authenticationRouter }