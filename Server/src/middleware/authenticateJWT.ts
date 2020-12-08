import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

//https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

/**
 * This class acts as the middleware to process an incoming Request to the application and 
 * verifies token existence
 */
export class authenticateJWT {

    static async verifyJWT(request: Request, response: Response, next: NextFunction) {

        const authHeader = request.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err: Error) => {
                if (err) {
                    console.log(err);
                    return response.sendStatus(403);
                }
                next();
            });
        } else {
            response.sendStatus(401);
        }
    }
}
