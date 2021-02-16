import { getConnection } from "typeorm";
import { IDimensionModel } from './interfaces/IDimension';
import { Dimension } from './entities/Dimension';
import { Units } from './entities/Units';

/**
 * This model contains all methods required for obtaining data from the Dimensions
 * table inside the database
 */
export class DimensionModel {
  private static connection = getConnection()

  /**
   * Method responsible for adding a new dimension.
   * It sets the entity values
   * @param dimensionInfo - Dimension Information from Frontend Request
   */
  static async insertDimension(dimensionInfo: IDimensionModel) {
    let dimension = new Dimension();
    dimension.id;
    dimension.name = dimensionInfo.name;

    await this.connection.manager.save(dimension);
  }

  /**
   * Method to verify if a name for dimension exists. Returns true or undefined
   * @param name - Dimension name
   */
  static async verifyIfNameExists(name: string): Promise<boolean> {
    let dimensionName = await this.connection.getRepository(Dimension)
      .createQueryBuilder('dimensions')
      .where('dimension.name := name', { name: name })
      .getOne();

    return dimensionName !== undefined;
  }

  /**
     * This method deletes an existing dimension but keeps its units in the database
     * @param dimensionId - dimension info that needs to be deleted
     */
  static async deleteDimension(dimensionId: number) {
    await this.connection.query("DELETE FROM dimensions WHERE id = ?", [dimensionId]);
    return "User favorite data set successfully removed";
  }

  /**
  * This method will update an existing dimension
  * @param dimensionInfo - dimension info that needs its values updated
  */
  static async updateDimension(dimensionInfo: IDimensionModel): Promise<boolean> {
    await this.connection.manager
      .createQueryBuilder(Dimension, 'dimensions')
      .update('dimensions')
      .set({ name: dimensionInfo.name })
      .set({ units: dimensionInfo.units })
      .where('dimensions.id = :id', { id: dimensionInfo.id })
      .execute()

    return true
  }

  /**
  * This method will return units of an existing dimension
  * @param dimensionId - existing dimension id that needs its units returned
  */
  static async getDimensionUnits(dimensionId: number): Promise<Units[]> {
    let dimensionUnits = await this.connection.manager
      .createQueryBuilder(Dimension, 'dimensions')
      .where('dimensions.id = :id', { id: dimensionId })
      .select('dimensions.units', 'units')
      .getOne()

    console.log(dimensionUnits)
    return dimensionUnits.units
  }

  /**
  * This method will return all existing dimensions
  */
  static async getAllDimensions(): Promise<DimensionModel[]> {
    let dimensions = await this.connection.manager
      .createQueryBuilder(Dimension, 'dimensions')
      .select('dimensions.id', 'id')
      .select('dimensions.name', 'name')
      .select('dimensions.units', 'units')
      .getMany()

    console.log(dimensions)
    return dimensions
  }
}