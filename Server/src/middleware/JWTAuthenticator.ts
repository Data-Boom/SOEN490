import 'dotenv/config';

import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

//https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

/**
 * This class acts as the middleware to process an incoming Request to the application and 
 * verifies token existence
 */
export class JWTAuthenticator {

    static async verifyJWT(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const token = request.cookies && request.cookies.token;
        if (!token) {
            return response.status(401).json({ error: "Missing JWT token" });
        }
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err: Error) => {
            if (err) {
                return response.status(403).json({ error: "JWT Token provided is incorrect" })
            }
            next();
        });

    }
}

