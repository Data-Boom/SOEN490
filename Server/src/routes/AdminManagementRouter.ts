import { Request, Response, Router } from 'express';
import { AdminManagementController } from '../controllers/AdminManagementController';
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();
let controllerObject = new AdminManagementController();

router.get('/api/v1/manageAdmin', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyRoot], (request: Request, response: Response) => {
    controllerObject.createRequestForAllAdmins(request, response);
});
router.put('/api/v1/manageAdmin', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyRoot], (request: Request, response: Response) => {
    controllerObject.createPermissionUpdateRequest(request, response);
});

export { router as AdminManagementRouter };