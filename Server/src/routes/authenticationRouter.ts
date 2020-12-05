import { sign } from 'crypto';
import { Request, Response, Router } from 'express';
import { authenticationService } from '../services/authenticationService';

let router = Router();

/**
 * This route is used when an authentication API is called.
 */

router.post('/signup', async (request: Request, response: Response) => {
    let signUp = new authenticationService();
    await signUp.processSignUp(request.query);
    response.status(200).send('success');
});

router.post('/login', async (request: Request, response: Response) => {
    let login = new authenticationService();
    let token = await login.checkLoginCredentials(request.query);
    if (token.statusCode == 200) {
        response.send(token);
    }
    else
        response.status(400).json({
            success: false
        })

});

router.get('/refresh', (request: Request, response: Response) => {

});

export { router as authenticationRouter }