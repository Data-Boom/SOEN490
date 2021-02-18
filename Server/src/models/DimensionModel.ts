import { BadRequest, InternalServerError } from "@tsed/exceptions";
import { IDimensionModel, IUnitModel } from './interfaces/IDimension';
import { Dimension } from './entities/Dimension';
import { Units } from './entities/Units';
import { Datapoints } from "./entities/Datapoints";
import { Connection, getConnection } from "typeorm";

/**
 * This model contains all methods required for obtaining data from the Dimensions
 * table inside the database
 */
export class DimensionModel {
  private connection: Connection;
  constructor() {
    this.connection = getConnection();
  }

  private async insertNewUnit(name: string, dimensionId: number, conversionFormula?: string) {
    let unit = new Units();
    unit.name = name;
    unit.dimensionId = dimensionId;
    unit.conversionFormula = conversionFormula;
    return unit
  }

  private async updateDimensionBaseUnit(id: number, baseUnitId: number) {
    await this.connection.createQueryBuilder()
      .update(Dimension)
      .set({ baseUnitId: baseUnitId })
      .where('id = :id', { id: id })
      .execute()
  }

  /**
   * Method responsible for adding a new dimension.
   * It sets the entity values
   * @param dimensionInfo - Dimension Information from Frontend Request
   */
  async insertDimension(dimensionInfo: IDimensionModel): Promise<number> {
    let dimensionModel = new Dimension();
    dimensionModel.name = dimensionInfo.name;
    await Dimension.save(dimensionModel);

    let baseUnit = await this.insertNewUnit(dimensionInfo.units[0].name, dimensionModel.id)
    await Units.save(baseUnit);
    await this.updateDimensionBaseUnit(dimensionModel.id, baseUnit.id)

    return dimensionModel.id
  }

  /**
   * Method to verify if a name for dimension exists; returns the dimension
   * @param name - Dimension name
   */
  async verifyIfNameExists(name: string): Promise<Dimension> {
    return await Dimension.findOne({ where: { name: name } })
  }

  /**
   * Method to verify if a dimension exists by ID. Returns true if doesn't find
   * @param id - Dimension ID
   */
  async verifyIfDimensionExists(id: number): Promise<Dimension> {
    return await Dimension.findOne({ where: { id: id } })
  }

  /**
  * This method deletes an existing dimension but keeps its units in the database
  * @param dimensionId - dimension id that needs to be deleted
  */
  async deleteDimension(dimensionId: number) {
    await Dimension.delete({ "id": dimensionId })
  }

  private async updateDimensionName(id: number, name: string) {
    await this.connection.createQueryBuilder()
      .update(Dimension)
      .set({ name: name })
      .where('id = :id', { id: id })
      .execute()
  }

  private async updateUnit(id: number, name: string, conversionFormula: string) {
    await this.connection.createQueryBuilder()
      .update(Units)
      .set({ name: name, conversionFormula: conversionFormula })
      .where('id = :id', { id: id })
      .execute()
  }

  /**
  * This method will update an existing dimension
  * **VERY IMPORTANT**
  * Make sure the IDimensionModel and IUnitsModel contain their original ids before calling backend API,
  * otherwise it'll be treated as a new entry and be added as a duplicate
  * @param dimensionInfo - dimension info that needs its values updated
  */
  async updateDimension(dimensionInfo: IDimensionModel): Promise<number> {
    let newUnit: Units
    let newUnits: Units[] = []
    let dimensionId = dimensionInfo.id
    await this.updateDimensionName(dimensionId, dimensionInfo.name)
    try {
      for (let i = 0; i < dimensionInfo.units.length; i++) {
        if (!dimensionInfo.units[i].name || !dimensionInfo.units[i].conversionFormula)
          throw new BadRequest("This dimension does not exist!");
        if (!dimensionInfo.units[i].id) {
          newUnit = await this.insertNewUnit(dimensionInfo.units[i].name, dimensionId, dimensionInfo.units[i].conversionFormula)
          newUnits.push(newUnit)
        }
        else {
          // Sanity check to ensure that base unit never has a conversion formula added on accident
          if (dimensionInfo.units[i].id == dimensionInfo.baseUnitId) {
            dimensionInfo.units[i].conversionFormula = "{u}"
          }
          await this.updateUnit(dimensionInfo.units[i].id, dimensionInfo.units[i].name, dimensionInfo.units[i].conversionFormula)
        }
      }
      await Units.save(newUnits);
    } catch (error) {
      throw new BadRequest(error.message)
    }
    return dimensionId;
  }

  /**
  * This method will return all existing units
  */
  async getAllUnits(): Promise<Units[]> {
    return await Units.find()
  }

  private selectDimensionsQuery = (connection: Connection) =>
    connection.createQueryBuilder(Dimension, 'dimension')
      .select('dimension.name', 'name')
      .addSelect('dimension.id', 'id')
      .addSelect('dimension.baseUnitId', 'baseUnitId')
      .getRawMany()

  /**
  * This method will return all existing dimensions
  */
  async getAllDimensions(): Promise<IDimensionModel[]> {
    let dimensions: IDimensionModel[] = await this.selectDimensionsQuery(this.connection)
    return dimensions
  }
}