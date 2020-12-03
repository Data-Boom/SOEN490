import { Request, Response } from 'express';
import { AuthenticationService } from '../services/authenticationService';

export class authenticationController {
    private authenticationService: AuthenticationService

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    createRequest(request: Request, response: Response) {
        if (!request.body) {
            response.status(400).send({
                message: "Nothing to process"
            });
        }

    }


}