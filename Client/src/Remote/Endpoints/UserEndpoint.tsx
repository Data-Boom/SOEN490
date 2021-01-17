import { IUserAccountModel, toLocalUserAccountModel } from "../../Models/Authentication/IUserAccountModel"

import { get } from "../RemoteHelper"
import { stringify } from 'query-string'

const resetPasswordRoute = '/resetPassword'
const updateUserInfoRoute = '/updateUserInfo'
const userDetailsRoute = '/userDetails'

interface IUserDetailsQuery {
  email: string
}

export const updateUserDetails = async (userInfo: IUserAccountModel): Promise<any> => {

}

export const getUserDetails = async (userDetailsQuery: IUserDetailsQuery): Promise<IUserAccountModel> => {
  const remoteUser = await get(userDetailsRoute, stringify(userDetailsQuery))
  return toLocalUserAccountModel(remoteUser)
}