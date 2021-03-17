import { DimensionsStore } from "./DimensionsStore"
import { IDimensionModel } from "../../../../../Server/src/models/interfaces/IDimension"
import { IUserAccountModel } from "../../../Models/Authentication/IUserAccountModel"
import { IVariableNameModel } from "../../../Models/Variables/IVariableNameModel"
import { UserStore } from "./UserStore"
import { VariablesStore } from "./VariablesStore"

interface IStore {
  dimensions: IDimensionModel[]
  variableNames: IVariableNameModel[]
  user: IUserAccountModel
}

export class RootStore {
  dimensionsStore: DimensionsStore
  variablesStore: VariablesStore
  userStore: UserStore

  constructor() {
    this.dimensionsStore = new DimensionsStore()
    this.variablesStore = new VariablesStore()
    this.userStore = new UserStore()
  }

  getPreloadedData(): IStore {
    return {
      dimensions: this.dimensionsStore.dimensions,
      variableNames: this.variablesStore.variables,
      user: this.userStore.user
    }
  }
}