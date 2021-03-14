import { Request, Response, Router } from 'express';
import { VariablesController } from '../controllers/VariablesController';


let router = Router();
let variablesController = new VariablesController();

/**
 * This route is used for auto suggestion of variables.
 */
router.get('/api/v1/variables', (request: Request, response: Response) => {
  variablesController.retrieveVariables(response);
});

export { router as variableRouter }