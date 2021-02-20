import { NextFunction, Request, Response } from 'express';

import { BadRequest } from '@tsed/exceptions';
import { DimensionService } from '../services/DimensionService';
import { IDimensionModel } from '../models/interfaces/IDimension'
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
      try {
        let requestParams: any = { ...request.body };
        let dimensionInfo: IDimensionModel = requestParams;
        let res: any = await this.callServiceForAddDimension(dimensionInfo, response, next);
        return res;
      } catch (error) {
        this.handleError(response, error);
      }
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
      this.handleError(response, error);
    }
  }

  async retrieveDimensions(response: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("Here!")
      let requestResponse = await this.dimensionService.processGetAllDimensions();
      return response.status(requestResponse.statusCode).json(requestResponse.message)
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async updateDimension(request: Request, response: Response, next: NextFunction): Promise<Response> {
    this.invalidResponse = this.validateUpdateDimension(request);
    if (this.invalidResponse) {
      return response.status(400).json("Request is invalid. Missing attributes")
    } else {
      try {
        let dimensionInfo: IDimensionModel = { ...request.body };
        if (this.validateDimensionInfo(dimensionInfo)) {
          let res: any = await this.callServiceForUpdateDimension(dimensionInfo, response, next);
          return res;
        }
        else {
          return response.status(400).json("Dimension has a baseUnit that is not included in the request.")
        }
      } catch (error) {
        this.handleError(response, error);
      }
    }
  }

  private async callServiceForUpdateDimension(dimensionInfo: IDimensionModel, response: Response, next: NextFunction): Promise<Response> {
    let serviceResponse: IResponse;
    try {
      serviceResponse = await this.dimensionService.processUpdateDimension(dimensionInfo);
      return response.status(serviceResponse.statusCode).json(serviceResponse.message);
    } catch (error) {
      this.handleError(response, error);
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
    return request.body.id === null || request.body.name === null;
  }

  private validateDimensionInfo(dimension: IDimensionModel): boolean {
    if (dimension.units.length != 0) {
      let unitIds = dimension.units.map(unit => unit.id);
      if (!unitIds.includes(dimension.baseUnitId)) {
        return false;
      }
    }
    return true;
  }

  private async callServiceForDeleteDimension(dimensionId: number, response: Response, next: NextFunction): Promise<Response> {
    let serviceResponse: IResponse;
    try {
      serviceResponse = await this.dimensionService.processDeleteDimension(dimensionId);
      return response.status(serviceResponse.statusCode).json(serviceResponse.message);
    } catch (error) {
      this.handleError(response, error)
    }
  }

  private handleError(response: Response, error: any) {
    if (error instanceof BadRequest) {
      response.status(error.status).json(error.message);
    }
    else {
      response.status(error.status).json("Something went Wrong");
    }
  }
}