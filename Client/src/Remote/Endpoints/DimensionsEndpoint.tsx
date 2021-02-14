import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { get, post, put, _delete } from "../FluentRequest"

import { IDimensionModel, IDimensionQueryModel, IUnitModel } from "../../../../Server/src/models/interfaces/IDimension"

const dimensionRoute = '/api/v1/dimension'

// /api/v1/dimensions - POST - dimension model
export const callAddDimension = async (dimensionModel: IDimensionModel): Promise<any> => {
    const result: IUnitModel[] = await post(dimensionRoute).withBody(dimensionModel).json()
    // if (result == 'Success') {
    // Snackbar has been added
    // SnackbarUtils.success(`New dimension has been added successfully`)
    // }
}

// /api/v1/dimensions/2 - PUT - dimension model
export const callChangeDimension = async (dimensionModel: IDimensionModel): Promise<any> => {
    const result = await put(dimensionRoute).withBody(dimensionModel).json()
    // if (result == 'Success') {
    // Snackbar for changing dimension
    // SnackbarUtils.success('Dimension has been changed successfully')
    // }
}

// /api/v1/dimensions/2 - DELETE - dimension ID
export const callDeleteDimension = async (dimensionId: number): Promise<any> => {
    const result = await _delete(dimensionRoute + '/' + dimensionId).json()
    // if (result == 'Success') {
    // Snackbar for changing dimension
    // SnackbarUtils.success('Dimension has been deleted successfully')
    // }
}

// Needs to be talked with frontend
export const callGetAllDimensions = async (): Promise<any> => {
    const result: IDimensionModel[] = await get(dimensionRoute).json()
    // if (result == 'Success') {
    // Snackbar has been added
    // SnackbarUtils.success(`New dimension has been added successfully`)
    // }
}