import { Response } from 'express';
import { VariableService } from '../services/VariableService';

/**
 * This controller is responsible for requests related to the variables route
 */
export class VariableController {
  private variableService: VariableService;

  constructor() {
    this.variableService = new VariableService();
  }

  async retrieveVariables(response: Response): Promise<Response> {
    try {
      let requestResponse = await this.variableService.processGetAllVariables();
      return response.status(requestResponse.statusCode).json(requestResponse.message)
    } catch (error) {
      response.status(error.status).json(error.message);
    }
  }
}