import { DimensionsStore } from "./DimensionsStore"
import { IDimensionModel } from "../../../../../Server/src/models/interfaces/IDimension"
import { IVariableNameModel } from "../../../Models/Variables/IVariableNameModel"
import { VariablesStore } from "./VariablesStore"

interface IStore {
  dimensions: IDimensionModel[]
  variableNames: IVariableNameModel[]
}

export class RootStore {
  dimensionsStore: DimensionsStore
  variablesStore: VariablesStore

  constructor() {
    this.dimensionsStore = new DimensionsStore()
    this.variablesStore = new VariablesStore()
  }

  getPreloadedData(): IStore {
    return {
      dimensions: this.dimensionsStore.dimensions,
      variableNames: this.variablesStore.variables
    }
  }
}