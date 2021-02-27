import { get } from "../FluentRequest"

import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { IVariableNameModel } from "../../Models/IVariableNameModel"

const variableRoute = '/api/v1/variables'

export const callGetVariables = async (): Promise<IVariableNameModel> => {
  const result = await get(variableRoute).json()
  if (result as IVariableNameModel[]) {
    return result
  } else {
    SnackbarUtils.error(`Could not get all variables`)
  }
  return result
}