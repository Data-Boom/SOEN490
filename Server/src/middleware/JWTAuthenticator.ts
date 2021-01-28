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
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err: Error, decoded: any) => {
            if (err) {
                return response.status(403).json({ error: "JWT Token provided is incorrect" })
            }
            let requestBody = request.body
            Object.assign(requestBody, {
                user: decoded.jwtPayload
            })
            next();
        });
    }

    static verifyAdmin(request: Request, response: Response, next: NextFunction): Response {
        // Lets us protect admin only backend routes vs any user routes
        if (request.body.user.account_admin !== 1) {
            return response.status(403).json({ error: "You are not authorized to complete this action" })
        }
        next();
    }
}
