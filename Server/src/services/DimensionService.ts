import 'dotenv/config';

import { BadRequest, InternalServerError } from "@tsed/exceptions";

import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { IDimensionModel, IUnitModel } from '../models/interfaces/IDimension';
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
    try {
      let verifyIfNameExists = await this.dimensionModel.verifyIfNameExists(dimensionInfo.name);
      if (verifyIfNameExists) {
        throw new BadRequest("This dimension already exists! Please enter a new name");
      }
      let dimensionID = await this.dimensionModel.insertDimension(dimensionInfo);
      this.requestResponse.message = dimensionID as any;
      this.requestResponse.statusCode = 201;
      return this.requestResponse
    } catch (error) {
      if (error instanceof BadRequest) {
        throw new BadRequest(error.message)
      }
      else {
        throw new Error("Something went wrong when adding new dimension.")
      }
    }
  }

  /**
   * This method updates an existing dimension based on the info sent by the frontend
   * @param dimensionInfo - dimension info that needs to be updated on the database
   */
  async processUpdateDimension(dimensionInfo: IDimensionModel): Promise<IResponse> {
    try {
      let verifyIfDimensionExists = await this.dimensionModel.verifyIfDimensionExists(dimensionInfo.id);
      if (!verifyIfDimensionExists) {
        throw new BadRequest("This dimension does not exist!");
      }
      let dimensionID = await this.dimensionModel.updateDimension(dimensionInfo);
      this.requestResponse.message = dimensionID as any;
      this.requestResponse.statusCode = 200;
      return this.requestResponse
    } catch (error) {
      if (error instanceof BadRequest) {
        throw new BadRequest(error.message)
      }
      else {
        throw new Error("Something went wrong when updating dimension.")
      }
    }
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
      let rawUnits = await this.dimensionModel.getAllUnits()
      let processedUnit: IUnitModel
      let processedUnits: IUnitModel[]
      for (let dimensionIndex = 0; dimensionIndex < dimensions.length; dimensionIndex++) {
        processedUnits = []
        for (let unitIndex = 0; unitIndex < rawUnits.length; unitIndex++) {
          if (rawUnits[unitIndex].dimensionId == dimensions[dimensionIndex].id) {
            processedUnit = {
              name: rawUnits[unitIndex].name,
              id: rawUnits[unitIndex].id,
              conversionFormula: rawUnits[unitIndex].conversionFormula
            }
            processedUnits.push(processedUnit)
            rawUnits.splice(unitIndex, 1)
            unitIndex--
          }
        }
        dimensions[dimensionIndex].units = processedUnits
      }
      this.requestResponse.message = dimensions as any
      this.requestResponse.statusCode = 200;
      return this.requestResponse;
    }
    catch (error) {
      throw new Error("Failed to get all dimensions")
    }
  }
}