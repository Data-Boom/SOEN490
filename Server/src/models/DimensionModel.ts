import { InternalServerError } from "@tsed/exceptions";
import { IDimensionModel, IUnitModel } from './interfaces/IDimension';
import { Dimension } from './entities/Dimension';
import { Units } from './entities/Units';
import { Datapoints } from "./entities/Datapoints";

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
  async insertDimension(dimensionInfo: IDimensionModel) {
    let dimensionModel = new Dimension();
    dimensionModel.name = dimensionInfo.name;
    dimensionModel = await Dimension.save(dimensionModel);

    if (dimensionInfo.units.length != 0) {
      let unitsToBeAdded: Units[] = []
      dimensionInfo.units.forEach(element => {
        let unit = new Units();
        unit.conversionFormula = element.conversionFormula;
        unit.name = element.name;
        unit.dimensionId = dimensionModel.id;
        unitsToBeAdded.push(unit);
      });
      await Units.save(unitsToBeAdded);
      dimensionModel.baseUnitId = unitsToBeAdded[0].id;
      await Dimension.save(dimensionModel);
    }
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
    await Dimension.delete({ "id": dimensionId })
  }

  /**
  * This method will update an existing dimension
  * **VERY IMPORTANT**
  * Make sure the IDimensionModel and IUnitsModel contain their original ids before calling backend API,
  * otherwise it'll be treated as a new entry and might be added as a duplicate or removed without notice
  * @param dimensionInfo - dimension info that needs its values updated
  */
  async updateDimension(dimensionInfo: IDimensionModel): Promise<boolean> {
    let unitIds: number[] = dimensionInfo.units.map(value => value.id);
    // Check to see if there are units already with the same dimensionId
    let foundUnits = await Units.find({ where: { dimensionId: dimensionInfo.id } });
    // Check if any of the found units are already in use in datapoints table
    foundUnits.forEach(async element => {
      let foundUnit = await Datapoints.find({ where: { "unitsId": element.id } })
      if (foundUnit.length != 0) {
        throw new InternalServerError(`UnitId ${element.id} is already in use`);
      }
      // Check if the found unitId from the database doesn't match with the one sent from frontend, then it needs to be removed from database
      else if (!unitIds.includes(element.id)) {
        await Units.delete({ "id": element.id });
      }
    })
    // Transform UnitModel[] into Units[]
    let units: Units[] = dimensionInfo.units.map(value => {
      let unit = new Units();
      unit.name = value.name;
      unit.id = value.id;
      unit.conversionFormula = value.conversionFormula;
      unit.dimensionId = value.dimensionId;
      return unit;
    })
    await Units.save(units);
    // Transform DimensionModel into Dimension
    let dimension = new Dimension();
    dimension.id = dimensionInfo.id;
    dimension.name = dimensionInfo.name;
    dimension.baseUnitId = dimensionInfo.baseUnitId;
    await Dimension.save(dimension);
    return true;
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
    let units = await Units.find();

    let dimensionModels = dimensions.map(value => {
      let dimensionModel: IDimensionModel = {
        name: value.name,
        id: value.id,
        baseUnitId: value.baseUnitId
      }
      let unitsModels = units.filter(value => value.dimensionId == dimensionModel.id).map(value => {
        let unit: IUnitModel = {
          name: value.name,
          id: value.id,
          conversionFormula: value.conversionFormula,
          dimensionId: value.dimensionId
        }
        return unit
      })
      dimensionModel.units = unitsModels;
      return dimensionModel;
    })
    return dimensionModels;
  }
}