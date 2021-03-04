import 'dotenv/config';

import { BadRequest } from "@tsed/exceptions";
import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { VariableModel } from '../models/VariableModel';

/**
 * This class handles requests related to variables
 */
export class VariableService {
  private requestResponse: IResponse = {} as any;
  private variableModel: VariableModel

  constructor() {
    this.variableModel = new VariableModel()
  }

  /**
   * This method calls the database for all the existing variables
   */
  async processGetAllVariables() {
    try {
      let variables = await this.variableModel.getAllVariables()
      this.requestResponse.message = variables as any
      this.requestResponse.statusCode = 200;
      return this.requestResponse;
    }
    catch (error) {
      throw new BadRequest("Error occured when fetching all variables");
    }
  }
}