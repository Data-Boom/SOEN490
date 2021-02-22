import { _delete, get, post, put } from "../FluentRequest"

import { IDimensionModel } from "../../../../Server/src/models/interfaces/IDimension"
import SnackbarUtils from "../../Components/Utils/SnackbarUtils"

const dimensionRoute = '/api/v1/dimension'

export const callAddDimension = async (dimensionModel: IDimensionModel): Promise<IDimensionModel> => {
  const result: IDimensionModel = await post(dimensionRoute).withBody(dimensionModel).json()
  if (result) {
    SnackbarUtils.success(`New dimension has been added successfully`)
  }
  return result
}

export const callChangeDimension = async (dimensionModel: IDimensionModel): Promise<any> => {
  const result = await put(dimensionRoute).withBody(dimensionModel).json()
  if (result == 'Success') {
    SnackbarUtils.success('Dimension has been changed successfully')
  }
}

export const callDeleteDimension = async (dimensionId: number): Promise<any> => {
  const result = await _delete(dimensionRoute + '/' + dimensionId).json()
  if (result == 'Success') {
    SnackbarUtils.success('Dimension has been deleted successfully')
  }
}

export const callGetAllDimensions = async (): Promise<any> => {
  const result: IDimensionModel[] = await get(dimensionRoute).json()
}