import { getVariableNames } from "../../../Remote/Endpoints/VariableEndpoint"
import { makeAutoObservable } from "mobx"

export class VariablesStore {
  constructor() {
    makeAutoObservable(this)
  }

  variables = []

  async loadVariables() {
    this.variables = await getVariableNames()
  }
}