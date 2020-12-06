import { Request, Response } from 'express';
import { AuthenticationService } from '../services/authenticationService';

export class AuthenticationController {
    private authenticationService: AuthenticationService;
    private invalidResponse: any;

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    createRequest(request: Request, response: Response, command: string) {
        switch (command) {
            case "signup":
                this.invalidResponse = this.validateSignInRequest(request);

            case "login":

            case "refresh":
        }

        // if (command === "signup" && this.validateSignInRequest(request)) {
        //     this.authenticationService.processSignUp(request.params);
        // }
        // else if (command === ) {
        //     response.status(401).send({
        //         message: "Missing required entries. Please check again"
        //     });
        // }
        // else {
        //     this.authenticationService.checkLoginCredentials(request.params);

        // }
    }

    private validateSignInRequest(request: Request) {
        let invalidAttributes: JSON;
    }

    private validatesLoginRequest(request: Request) {
    }
}