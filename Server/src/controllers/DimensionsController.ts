import { NextFunction, Request, Response } from 'express';

import { DimensionService } from '../services/DimensionService';
import { IDimensionModel, IUnitModel } from '../models/interfaces/IDimension'
import { BadRequest } from '@tsed/exceptions';
import { IResponse } from '../genericInterfaces/ResponsesInterface'

/**
 * This controller is responsible for verifying the user request has correct parameters input.
 * After request is verified, the appropriate service will be called
 */
export class DimensionsController {
  private dimensionService: DimensionService;
  private invalidResponse: boolean;

  constructor() {
  }

  async retrieveDimensions(request: Request, response: Response) {
    try {
      this.dimensionService = new DimensionService();
      let requestResponse = await this.dimensionService.processGetAllDimensions();
      return response.status(requestResponse.statusCode).json(requestResponse.message)
    } catch (error) {
      response.status(error.status).json(error.message);
    }
  }

  async createDimension(request: Request, response: Response) {
    let invalidResponse = this.validateCreateDimensionRequest(request);
    if (!invalidResponse) {
      response.status(400).json("Create dimension request is invalid.")
    } else {
      try {
        this.dimensionService = new DimensionService();
        let requestParams: any = { ...request.body };
        let dimensionInfo: IDimensionModel = requestParams;
        let serviceResponse = await this.dimensionService.processAddDimension(dimensionInfo);
        response.status(serviceResponse.statusCode).json(serviceResponse.message);
      } catch (error) {
        response.status(error.status).json(error.message);
      }
    }
  }

  private validateCreateDimensionRequest(request: Request): boolean {
    if (request.body.hasOwnProperty('name') && request.body.units.length == 1) { return true }
    else {
      return false
    }
  }

  async updateDimension(request: Request, response: Response): Promise<Response> {
    let invalidResponse = this.validateUpdateDimension(request);
    if (!invalidResponse) {
      response.status(400).json("Update dimension request is invalid.")
    } else {
      try {
        this.dimensionService = new DimensionService();
        let requestParams: any = { ...request.body };
        let dimensionInfo: IDimensionModel = requestParams;
        let serviceResponse = await this.dimensionService.processUpdateDimension(dimensionInfo);
        return response.status(serviceResponse.statusCode).json(serviceResponse.message);
      } catch (error) {
        if (error instanceof BadRequest)
          return response.status(error.status).json(error.message);
        else {
          return response.status(error.status).json("Something went Wrong");
        }
      }
    }
  }

  private validateUpdateDimension(request: Request): boolean {
    if (request.body.hasOwnProperty('name') && request.body.hasOwnProperty('id')
      && request.body.hasOwnProperty('baseUnitId') && request.body.units.length > 0) { return true }
    else {
      return false
    }
  }

  async deleteDimension(request: Request, response: Response, next: NextFunction): Promise<Response> {
    this.invalidResponse = this.validateUpdateDimension(request);
    if (this.invalidResponse) {
      return response.status(400).json("Request is invalid. Missing attributes")
    } else {
      let dimensionId = +request.params.id
      let res: any = await this.callServiceForDeleteDimension(dimensionId, response, next);
      return res;
    }
  }

  private async callServiceForDeleteDimension(dimensionId: number, response: Response, next: NextFunction): Promise<Response> {
    let serviceResponse: IResponse;

    try {
      this.dimensionService = new DimensionService();
      serviceResponse = await this.dimensionService.processDeleteDimension(dimensionId);
      return response.status(serviceResponse.statusCode).json(serviceResponse.message);
    } catch (error) {
      if (error instanceof BadRequest)
        return response.status(error.status).json(error.message);
      else {
        return response.status(error.status).json("Something went Wrong");
      }
    }
  }

}