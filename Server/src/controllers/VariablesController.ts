import { Response } from 'express';
import { BadRequest } from '@tsed/exceptions';
import { VariableService } from '../services/VariableService';

/**
 * This controller is responsible for requests related to the variables route
 */
export class VariablesController {
  private variableService: VariableService;
  private invalidResponse: boolean;

  constructor() {
    this.variableService = new VariableService();
  }

  async retrieveVariables(response: Response): Promise<Response> {
    try {
      let requestResponse = await this.variableService.processGetAllVariables();
      return response.status(requestResponse.statusCode).json(requestResponse.message)
    } catch (error) {
      this.handleError(response, error);
    }
  }

  private handleError(response: Response, error: any) {
    if (error instanceof BadRequest) {
      response.status(error.status).json(error.message);
    }
    else {
      response.status(error.status).json("Something went wrong with variable operation");
    }
  }
}