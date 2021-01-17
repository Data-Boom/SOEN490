import { NextFunction, Request, Response, Router } from 'express';

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

router.post('/updateUserInfo', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {

    authenticationController.updateUserDetailRequest(request, response, next);
});

router.get('/userDetails', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {
    console.log('email is');
    console.log(request.query);
    authenticationController.createFetchUserDetailsRequest(request, response);
});


export { router as authenticationRouter }

