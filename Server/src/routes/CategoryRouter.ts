import { Request, Response, Router } from 'express';
import { CategoryController } from '../controllers/CategoryController'
import { JWTAuthenticator } from '../middleware/JWTAuthenticator';

let router = Router();

let categoryController = new CategoryController();

// router.post('/api/v1/category', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyRoot], (request: Request, response: Response) => {
//     categoryController.createCategory(request, response);
// });

router.get('/api/v1/category', (request: Request, response: Response) => {
    categoryController.retrieveCategories(response);
});

// router.put('/api/v1/category', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyRoot], (request: Request, response: Response) => {
//     categoryController.updateCategory(request, response);
// });

// router.delete('/api/v1/category/:id?', [JWTAuthenticator.verifyJWT, JWTAuthenticator.verifyRoot], (request: Request, response: Response) => {
//     categoryController.deleteCategory(request, response);
// });

export { router as CategoryRouter }