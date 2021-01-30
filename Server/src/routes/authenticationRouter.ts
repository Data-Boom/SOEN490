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

router.post('/forgotPassword', (request: Request, response: Response, next: NextFunction) => {
    authenticationController.createForgotPasswordRequest(request, response, next);
});

router.post('/api/v1/resetPassword/:resetToken', (request: Request, response: Response, next: NextFunction) => {
    authenticationController.resetPasswordWithResetTokenRequest(request, response, next);
});

router.post('/updateUserInfo', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {
    authenticationController.updateUserDetailRequest(request, response, next);
});

router.get('/userDetails', JWTAuthenticator.verifyJWT, async (request: Request, response: Response, next: NextFunction) => {
    authenticationController.createFetchUserDetailsRequest(request, response);
});


export { router as authenticationRouter }

