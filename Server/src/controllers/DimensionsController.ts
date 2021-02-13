import { IForgotPasswordInformation, ILoginInformation, IResetPasswordInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { NextFunction, Request, Response } from 'express';

import { DimensionService } from '../services/DimensionService';
// import { IDimensionModel } from '../models/units/IDimension';
import { IDimensionModel, IUnitModel } from '../models/interfaces/IDimension'
import { BadRequest } from '@tsed/exceptions';
import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces';
import { IUpdateUserDetail } from './../genericInterfaces/AuthenticationInterfaces';

/**
 * This controller is responsible for verifying the user request has correct parameters input.
 * After request is verified, the appropriate service can be called to fulfill user signup or login
 */
export class DimensionsController {
  private dimensionService: DimensionService;
  private invalidResponse: boolean;

  constructor() {
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
    return request.body.name == null && this.validateCreateUnitsRequest(request.body.units)
  }

  private validateCreateUnitsRequest(units: IUnitModel[]): boolean {
    return units.length != 0;
  }

  private async callServiceForAddDimension(dimensionInfo: IDimensionModel, response: Response, next: NextFunction): Promise<Response> {
    this.dimensionService = new DimensionService();
    let serviceResponse: IResponse;
    console.log(serviceResponse);
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

  // private validateCreateDimensionRequest(request: Request): boolean {
  //   return request.body.name == null && this.validateCreateUnitsRequest(request.body.units)
  // }

  // private validateCreateUnitsRequest(units: IUnitModel[]): boolean {
  //   return units.length != 0;
  // }

  // private async callServiceForAddDimension(dimensionInfo: IDimensionModel, response: Response, next: NextFunction): Promise<Response> {
  //   this.dimensionService = new DimensionService();
  //   let serviceResponse: IResponse;
  //   console.log(serviceResponse);
  //   try {
  //     serviceResponse = await this.dimensionService.processAddDimension(dimensionInfo);
  //     return response.status(serviceResponse.statusCode).json(serviceResponse.message);
  //   } catch (error) {
  //     if (error instanceof BadRequest)
  //       return response.status(error.status).json(error.message);
  //     else {
  //       return response.status(error.status).json("Something went Wrong");
  //     }
  //   }
  // }

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

  // private validateCreateDimensionRequest(request: Request): boolean {
  //   return request.body.name == null && this.validateCreateUnitsRequest(request.body.units)
  // }

  // private validateCreateUnitsRequest(units: IUnitModel[]): boolean {
  //   return units.length != 0;
  // }

  // private async callServiceForAddDimension(dimensionInfo: IDimensionModel, response: Response, next: NextFunction): Promise<Response> {
  //   this.dimensionService = new DimensionService();
  //   let serviceResponse: IResponse;
  //   console.log(serviceResponse);
  //   try {
  //     serviceResponse = await this.dimensionService.processAddDimension(dimensionInfo);
  //     return response.status(serviceResponse.statusCode).json(serviceResponse.message);
  //   } catch (error) {
  //     if (error instanceof BadRequest)
  //       return response.status(error.status).json(error.message);
  //     else {
  //       return response.status(error.status).json("Something went Wrong");
  //     }
  //   }
  // }

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

  // private validateCreateDimensionRequest(request: Request): boolean {
  //   return request.body.name == null && this.validateCreateUnitsRequest(request.body.units)
  // }

  // private validateCreateUnitsRequest(units: IUnitModel[]): boolean {
  //   return units.length != 0;
  // }

  // private async callServiceForAddDimension(dimensionInfo: IDimensionModel, response: Response, next: NextFunction): Promise<Response> {
  //   this.dimensionService = new DimensionService();
  //   let serviceResponse: IResponse;
  //   console.log(serviceResponse);
  //   try {
  //     serviceResponse = await this.dimensionService.processAddDimension(dimensionInfo);
  //     return response.status(serviceResponse.statusCode).json(serviceResponse.message);
  //   } catch (error) {
  //     if (error instanceof BadRequest)
  //       return response.status(error.status).json(error.message);
  //     else {
  //       return response.status(error.status).json("Something went Wrong");
  //     }
  //   }
  // }
}