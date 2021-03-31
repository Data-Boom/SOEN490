import { get, put } from "../FluentRequest"

import { IUpdatePermissionInfo } from '../../Models/Permissions/IUpdatePermissionInfo'
import SnackbarUtils from '../../Components/Utils/SnackbarUtils'

const updatePermissionsRoute = '/api/v1/manageAdmin'
const getAdminsAllRoute = '/api/v1/manageAdmin'

export const updatePermissions = async (updatePermissions: IUpdatePermissionInfo): Promise<any> => {
  const result = await put(updatePermissionsRoute).withBody(updatePermissions).json()
  if (result == 'Admin permissions successfully revoked') {
    SnackbarUtils.success(result)
  }
  else if (result == 'User successfully given admin permissions') {
    SnackbarUtils.success(result)
  }
  else {
    SnackbarUtils.error(result)
  }
}

export const fetchAllAdmins = async (): Promise<any> => {
  const result = await get(getAdminsAllRoute).json()
  return result
}