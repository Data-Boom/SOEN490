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
    this.dimensionService = new DimensionService();
  }

  async createDimension(request: Request, response: Response, next: NextFunction): Promise<Response> {
    this.invalidResponse = this.validateCreateDimensionRequest(request);
    if (this.invalidResponse) {
      return response.status(400).json("Request is invalid. Missing attributes")
    } else {
      let requestParams: any = { ...request.body };
      let dimensionInfo: IDimensionModel = requestParams;
      let res: any = await this.callServiceForAddDimension(dimensionInfo, response, next);
      return res;
    }
  }

  private validateCreateDimensionRequest(request: Request): boolean {
    return request.body.name == null
  }

  private async callServiceForAddDimension(dimensionInfo: IDimensionModel, response: Response, next: NextFunction): Promise<Response> {
    let serviceResponse: IResponse;

    try {
      serviceResponse = await this.dimensionService.processAddDimension(dimensionInfo);
      return response.status(serviceResponse.statusCode).json(serviceResponse.message);
    } catch (error) {
      if (error instanceof BadRequest)
        return response.status(error.status).json(error.message);
      else {
        return response.status(error.status).json("Something went Wrong");
      }
    }
  }

  async retrieveDimensions(response: Response, next: NextFunction): Promise<Response> {
    try {
      let requestResponse = await this.dimensionService.processGetAllDimensions();
      return response.status(requestResponse.statusCode).json(requestResponse.message)
    } catch (error) {
      response.status(error.status).json(error.message);
    }
  }

  async updateDimension(request: Request, response: Response, next: NextFunction): Promise<Response> {
    this.invalidResponse = this.validateUpdateDimension(request);
    if (this.invalidResponse) {
      return response.status(400).json("Request is invalid. Missing attributes")
    } else {
      let dimensionInfo: IDimensionModel = { ...request.body };
      let res: any = await this.callServiceForUpdateDimension(dimensionInfo, response, next);
      return res;
    }
  }

  private async callServiceForUpdateDimension(dimensionInfo: IDimensionModel, response: Response, next: NextFunction): Promise<Response> {
    let serviceResponse: IResponse;

    try {
      serviceResponse = await this.dimensionService.processAddDimension(dimensionInfo);
      return response.status(serviceResponse.statusCode).json(serviceResponse.message);
    } catch (error) {
      if (error instanceof BadRequest)
        return response.status(error.status).json(error.message);
      else {
        return response.status(error.status).json("Something went Wrong");
      }
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

  private validateUpdateDimension(request: Request): boolean {
    return request.params.id === null;
  }

  private async callServiceForDeleteDimension(dimensionId: number, response: Response, next: NextFunction): Promise<Response> {
    let serviceResponse: IResponse;

    try {
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