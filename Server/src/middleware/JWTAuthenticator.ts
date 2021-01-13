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

        const authHeader = request.headers.authorization;
        console.log(authHeader);
        console.log(request);
        if (!authHeader) {
            return response.status(401).json({ error: "Missing JWT token from the 'Authorization' header" });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err: Error) => {
            if (err) {
                console.log(err);
                return response.status(403).json({ error: "JWT Token provided is incorrect" })
            }
            next();
        });

    }
}

