import { NotFound } from "@tsed/exceptions";
import { Connection, getConnection } from "typeorm";
import { IDimensionModel } from './interfaces/IDimension';
import { Dimension } from './entities/Dimension';
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
  async insertDimension(dimensionInfo: IDimensionModel) {
    let connection = getConnection();
    let dimension = new Dimension();
    dimension.id;
    dimension.name = dimensionInfo.name;

    await connection.manager.save(dimension);
  }

  /**
   * Method to verify if a name for dimension exists. Returns true or undefined
   * @param name - Dimension name
   */
  async verifyIfNameExists(name: string): Promise<boolean> {
    let connection = getConnection();
    let dimensionName = await connection.getRepository(Dimension)
      .createQueryBuilder('dimension')
      .where('dimension.name = :name', { name: name })
      .getOne();

    return dimensionName !== undefined;
  }

  /**
  * This method deletes an existing dimension but keeps its units in the database
  * @param dimensionId - dimension info that needs to be deleted
  */
  async deleteDimension(dimensionId: number) {
    let connection = getConnection();
    await connection.query("DELETE FROM dimension WHERE id = ?", [dimensionId]);
    return "User favorite data set successfully removed";
  }

  /**
  * This method will update an existing dimension
  * @param dimensionInfo - dimension info that needs its values updated
  */
  async updateDimension(dimensionInfo: IDimensionModel): Promise<boolean> {
    let connection = getConnection();
    await connection.manager
      .createQueryBuilder(Dimension, 'dimension')
      .update('dimension')
      .set({ name: dimensionInfo.name })
      .set({ units: dimensionInfo.units })
      .where('dimension.id = :id', { id: dimensionInfo.id })
      .execute()

    return true
  }

  /**
  * This method will return units of an existing dimension
  * @param dimensionId - existing dimension id that needs its units returned
  */
  async getDimensionUnits(dimensionId: number): Promise<Units[]> {
    let connection = getConnection();
    let dimensionUnits = await connection.manager
      .createQueryBuilder(Dimension, 'dimension')
      .where('dimension.id = :id', { id: dimensionId })
      .select('dimension.units', 'units')
      .getOne()

    console.log(dimensionUnits)
    return dimensionUnits.units
  }

  /**
  * This method will return all existing dimensions
  */
  async getAllDimensions(): Promise<Dimension[]> {
    let connection = getConnection();
    let dimensions = await connection.manager
      .createQueryBuilder(Dimension, 'dimension')
      .select('dimension.id', 'id')
      .select('dimension.name', 'name')
      .select('dimension.units', 'units')
      .getMany()

    console.log(dimensions)
    return dimensions
  }
}