import { IUserAccountModel, toLocalUserAccountModel } from "../../Models/Authentication/IUserAccountModel"
import { get, post } from "../RemoteHelper"

import { stringify } from 'query-string'

const resetPasswordRoute = '/resetPassword'
const updateUserInfoRoute = '/updateUserInfo'
const userDetailsRoute = '/userDetails'

interface IUserDetailsQuery {
  email: string
}

export const updateUserDetails = async (userProfile: IUserAccountModel): Promise<IUserAccountModel> => {
  console.log(userProfile)
  const remoteUser = await post(updateUserInfoRoute, userProfile)
  console.log(remoteUser)
  console.log('got here')
  return remoteUser
}

export const getUserDetails = async (userDetailsQuery: IUserDetailsQuery): Promise<IUserAccountModel> => {
  const remoteUser = await get(userDetailsRoute, stringify(userDetailsQuery))
  return toLocalUserAccountModel(remoteUser)
}