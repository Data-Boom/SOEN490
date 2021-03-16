import { getVariableNames } from "../../../Remote/Endpoints/VariableEndpoint"

export class VariablesStore {
  variables = []

  async loadVariables() {
    this.variables = await getVariableNames()
  }
}