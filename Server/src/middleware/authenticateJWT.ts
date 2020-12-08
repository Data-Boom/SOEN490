import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

export class authenticateJWT {

    static async verifyJWT(request: Request, response: Response, next: NextFunction) {

        const authHeader = request.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.SECRET_KEY, (err) => {
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
