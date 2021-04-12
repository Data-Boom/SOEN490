import { IVariableNameModel } from "../../Models/Variables/IVariableNameModel"
import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { get } from "../FluentRequest"

const variableRoute = '/api/v1/variables'

export const getVariableNames = async (): Promise<IVariableNameModel[]> => {
  const result = await get(variableRoute).json()
  if (result) {
    return result
  } else {
    SnackbarUtils.error(`Could not get all variables`)
  }
  return result || []
}