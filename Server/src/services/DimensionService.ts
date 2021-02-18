import 'dotenv/config';

import { BadRequest, InternalServerError } from "@tsed/exceptions";

import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { IDimensionModel } from '../models/interfaces/IDimension';
import { DimensionModel } from '../models/DimensionModel';
import { Units } from '../models/entities/Units';
import { Dimension } from '../models/entities/Dimension';

/**
 * This class handles requests related to dimensions and units and also
 * interacts with the database for the Dimensions table
 */
export class DimensionService {
  private requestResponse: IResponse = {} as any;
  private dimensionModel: DimensionModel

  constructor() {
    this.dimensionModel = new DimensionModel()
  }

  /**
   * This method is responsible for handling the logic of adding a new dimension. Steps followed:
   * Dimension name is checked against the database for duplication, upon success, the new dimension
   * is saved in the database.
   * @param dimensionInfo - dimension info that was sent from the frontend
   */
  async processAddDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {
    let name: boolean
    name = await this.dimensionModel.verifyIfNameExists(dimensionInfo.name);
    if (name) {
      throw new BadRequest("This dimension already exists! Please enter different values");
    }
    else {
      try {
        await this.dimensionModel.insertDimension(dimensionInfo);
      }
      catch (error) {
        throw new InternalServerError("Internal Server Issue. Please try again later", error.message);
      }
    }
    this.requestResponse.message = "Success";
    this.requestResponse.statusCode = 200;
    return this.requestResponse
  }

  /**
   * This method updates an existing dimension based on the info sent by the frontend
   * @param dimensionInfo - dimension info that needs to be updated on the database
   */
  async processUpdateDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {
    let name: boolean
    name = await this.dimensionModel.verifyIfNameExists(dimensionInfo.name);
    if (!name) {
      throw new BadRequest("This dimension does not exist!");
    }
    else {
      try {
        await this.dimensionModel.updateDimension(dimensionInfo);
      }
      catch (error) {
        throw new InternalServerError("Internal Server Issue. Please try again later", error.message);
      }
    }
    this.requestResponse.message = "Success";
    this.requestResponse.statusCode = 200;
    return this.requestResponse
  }

  /**
   * This method calls the database to remove an existing dimension
   * @param dimensionId - dimension id that needs to be deleted from the database
   */
  async processDeleteDimension(dimensionId: number): Promise<IResponse> {
    try {
      await this.dimensionModel.deleteDimension(dimensionId);
    }
    catch (error) {
      throw new InternalServerError("Internal server error, please try again later", error.message);
    }
    this.requestResponse.message = "Success";
    this.requestResponse.statusCode = 200;
    return this.requestResponse;
  }

  /**
   * This method calls the database for all the existing dimensions
   */
  async processGetAllDimensions() {
    try {
      let dimensions = await this.dimensionModel.getAllDimensions()
      this.requestResponse.message = dimensions as any
      this.requestResponse.statusCode = 200;
      return this.requestResponse;
    }
    catch (error) {
      throw new InternalServerError("Internal server error, please try again later", error.message)
    }
  }

  /**
   * This method gets all of an existing dimension's units
   * @param dimensionId - the dimension id that needs its units returned from the database
   */
  async processGetDimensionUnits(dimensionId: number): Promise<Units[]> {
    try {
      return this.dimensionModel.getDimensionUnits(dimensionId)
    }
    catch (error) {
      return []
    }
  }
}