import 'dotenv/config';

import { BadRequest } from "@tsed/exceptions";
import { DimensionModel } from '../models/DimensionModel';
import { IDimensionModel } from '../models/interfaces/IDimension';
import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { Units } from '../models/entities/Units';

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
      throw new BadRequest("This dimension already exists! Please use different values");
    }
    else {
      try {
        let createdDimension = await this.dimensionModel.insertDimension(dimensionInfo);
        this.requestResponse.message = createdDimension as any;
        this.requestResponse.statusCode = 201;
        return this.requestResponse
      }
      catch (error) {
        throw new BadRequest("Error occured when adding dimension");
      }
    }
  }

  /**
   * This method updates an existing dimension based on the info sent by the frontend
   * @param dimensionInfo - dimension info that needs to be updated on the database
   */
  async processUpdateDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {
    try {
      let updatedDimension = await this.dimensionModel.updateDimension(dimensionInfo);
      this.requestResponse.message = updatedDimension as any;
    }
    catch (error) {
      throw new BadRequest(error.message);
    }
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
      throw new BadRequest(error.message);
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
      throw new BadRequest("Error occured when fetching all dimensions");
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
      throw new BadRequest("Error occured when fetching all units of a dimension");
    }
  }
}