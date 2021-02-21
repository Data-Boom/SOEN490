import { Request, Response } from 'express';

import { BadRequest } from '@tsed/exceptions';
import { DimensionService } from '../services/DimensionService';
import { IDimensionModel } from '../models/interfaces/IDimension'

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

  async createDimension(request: Request, response: Response): Promise<Response> {
    this.invalidResponse = this.validateCreateDimensionRequest(request);
    if (this.invalidResponse) {
      return response.status(400).json("Request is invalid. Missing attributes")
    } else {
      try {
        let requestParams: any = { ...request.body };
        let dimensionInfo: IDimensionModel = requestParams;
        let requestResponse: any = await this.dimensionService.processAddDimension(dimensionInfo);
        return response.status(requestResponse.statusCode).json(requestResponse.message);
      } catch (error) {
        this.handleError(response, error);
      }
    }
  }

  private validateCreateDimensionRequest(request: Request): boolean {
    return !request.body.name || !request.body.units[0].name;
  }

  async retrieveDimensions(response: Response): Promise<Response> {
    try {
      let requestResponse = await this.dimensionService.processGetAllDimensions();
      return response.status(requestResponse.statusCode).json(requestResponse.message)
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async updateDimension(request: Request, response: Response): Promise<Response> {
    this.invalidResponse = this.validateUpdateDimension(request);
    if (this.invalidResponse) {
      return response.status(400).json("Request is invalid. Missing attributes")
    } else {
      try {
        let dimensionInfo: IDimensionModel = { ...request.body };
        if (this.validateDimensionInfo(dimensionInfo)) {
          let requestResponse: any = await this.dimensionService.processUpdateDimension(dimensionInfo);
          return response.status(requestResponse.statusCode).json(requestResponse.message);
        }
        else {
          return response.status(400).json("Dimension has a baseUnit that is not included in the request.")
        }
      } catch (error) {
        this.handleError(response, error);
      }
    }
  }

  async deleteDimension(request: Request, response: Response): Promise<Response> {
    let requestParam = request.params.id;
    let dimensionId = Number(requestParam);
    if (isNaN(dimensionId)) {
      return response.status(400).json("Invalid dimension ID entered");
    }
    try {
      let requestResponse: any = await this.dimensionService.processDeleteDimension(dimensionId);
      return response.status(requestResponse.statusCode).json(requestResponse.message);
    } catch (error) {
      this.handleError(response, error)
    }
  }

  private validateUpdateDimension(request: Request): boolean {
    return !request.body.id || this.validateCreateDimensionRequest(request) || !request.body.baseUnitId;
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

  private handleError(response: Response, error: any) {
    if (error instanceof BadRequest) {
      response.status(error.status).json(error.message);
    }
    else {
      response.status(error.status).json("Something went wrong with dimension operation");
    }
  }
}