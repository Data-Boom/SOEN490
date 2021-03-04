import { Datapoints } from "./entities/Datapoints";
import { IVariableNameModel } from "../../../Client/src/Models/IVariableNameModel"
import { getConnection, getManager } from "typeorm";


export class VariableModel {
  /**
  * This method will return all existing variables or datapoints in the format of IVariableModel
  */
  async getAllVariables(): Promise<IVariableNameModel[]> {
    let variables = await getConnection()
      .createQueryBuilder(Datapoints, 'Datapoints')
      .select('name')
      .distinct(true)
      .getRawMany();

    let variableModel = variables.map(variable => {
      return {
        name: variable.name
      }
    })
    return variableModel;
  }
}