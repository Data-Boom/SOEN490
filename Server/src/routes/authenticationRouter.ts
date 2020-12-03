import { Request, Response, Router } from 'express';

let router = Router();

/**
 * This route is used when an authentication API is called.
 */

router.post('/signup', (request: Request, response: Response) => {

});

router.post('/login', (request: Request, response: Response) => {

});

router.get('/refresh', (request: Request, response: Response) => {

});

export { router as authenticationRouter }