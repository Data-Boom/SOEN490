import { BadRequest } from "@tsed/exceptions";
import { Datapoints } from "./entities/Datapoints";
import { Dimension } from './entities/Dimension';
import { IDimensionModel } from './interfaces/IDimension';
import { Units } from './entities/Units';

/**
 * This model contains all methods required for obtaining data from the Dimensions
 * table inside the database
 */
export class DimensionModel {

  /**
   * Method responsible for adding a new dimension.
   * It sets the entity values
   * @param dimensionInfo - Dimension Information from Frontend Request
   */
  async insertDimension(dimensionInfo: IDimensionModel): Promise<IDimensionModel> {
    let dimensionModel = new Dimension();
    dimensionModel.name = dimensionInfo.name;
    dimensionModel = await Dimension.save(dimensionModel);

    if (dimensionInfo.units.length != 0) {
      let unitsToBeAdded = Units.convertToUnits(dimensionInfo.units, dimensionModel.id);
      let units = await Units.save(unitsToBeAdded);
      dimensionInfo = Dimension.convertToModel(dimensionModel, units);
    }
    return dimensionInfo;
  }

  /**
   * Method to verify if a name for dimension exists. Returns true if doesn't find
   * @param name - Dimension name
   */
  async verifyIfNameExists(name: string): Promise<boolean> {
    return await Dimension.findOne({ where: { name: name } }).then((value) => value !== undefined)
  }

  /**
  * This method deletes an existing dimension but keeps its units in the database
  * @param dimensionId - dimension id that needs to be deleted
  */
  async deleteDimension(dimensionId: number) {
    let dimensionUnits = await Units.find({ where: { "dimensionId": dimensionId } });
    for (const unit of dimensionUnits) {
      await this.validateUnitInUseDatapoint(unit);
    }
    for (const unit of dimensionUnits) {
      await Units.delete({ "id": unit.id });
    }
    await Dimension.delete({ "id": dimensionId })
  }

  /**
  * This method will update an existing dimension
  * **VERY IMPORTANT**
  * Make sure the IDimensionModel and IUnitsModel contain their original ids before calling backend API,
  * otherwise it'll be treated as a new entry and might be added as a duplicate or removed without notice
  * @param dimensionInfo - dimension info that needs its values updated
  */
  async updateDimension(dimensionInfo: IDimensionModel): Promise<IDimensionModel> {
    let unitIds: number[] = dimensionInfo.units.map(value => value.id);
    let foundUnits = await Units.find({ where: { dimensionId: dimensionInfo.id } });
    for (const element of foundUnits) {
      if (!unitIds.includes(element.id)) {
        await this.validateUnitInUseDatapoint(element);
        await Units.delete({ "id": element.id });
      }
    }
    let units = Units.convertToUnits(dimensionInfo.units, dimensionInfo.id)
    let savedUnits = await Units.save(units);
    dimensionInfo.units = Units.convertToModel(savedUnits);
    let dimension = Dimension.convertToDimension(dimensionInfo);
    await Dimension.save(dimension);
    return dimensionInfo;
  }

  /**
   * Validates a unit entity before deletion to make sure it is not in use in datapoints
   * @param unit - entity that needs to be checked
   */
  private async validateUnitInUseDatapoint(unit: Units) {
    let foundUnit = await Datapoints.find({ where: { "unitsId": unit.id } })
    if (foundUnit.length != 0) {
      throw new BadRequest(`Can't remove a unit since it is already in use in datapoints`);
    }
  }

  /**
  * This method will return units of an existing dimension
  * @param dimensionId - existing dimension id that needs its units returned
  */
  async getDimensionUnits(dimensionId: number): Promise<Units[]> {
    return await Units.find({ where: { "dimensionId": dimensionId } })
  }

  /**
  * This method will return all existing dimensions
  */
  async getAllDimensions(): Promise<IDimensionModel[]> {
    let dimensions = await Dimension.find();
    console.log(dimensions)
    let units = await Units.find();
    //console.log(units)
    //console.log("Here 2!")
    let dimensionModels = dimensions.map(dimension => {
      let filteredUnits = units.filter(value => value.dimensionId == dimension.id)
      let dimensionModel = Dimension.convertToModel(dimension, filteredUnits);
      return dimensionModel;
    })
    console.log(dimensionModels)
    return dimensionModels;
  }
}