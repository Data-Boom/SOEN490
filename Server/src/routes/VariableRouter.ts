import { Response, Router } from 'express';
import { VariableController } from '../controllers/VariableController';


let router = Router();
let variableController = new VariableController();

/**
 * This route is used for auto suggestion of variables.
 */
router.get('/api/v1/variables', (response: Response) => {
  variableController.retrieveVariables(response);
});

export { router as variableRouter }