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


  async retrieveDimensions(request: Request, response: Response, next: NextFunction): Promise<Response> {
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

  async updateDimension(request: Request, response: Response, next: NextFunction): Promise<Response> {
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

  async deleteDimension(request: Request, response: Response, next: NextFunction): Promise<Response> {
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

}