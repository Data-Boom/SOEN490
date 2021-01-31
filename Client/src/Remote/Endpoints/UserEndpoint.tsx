import { IUserAccountModel, IUserDetailsModel, toLocalUserAccountModel } from "../../Models/Authentication/IUserAccountModel"
import { get, post } from "../RemoteHelper"

import { stringify } from 'query-string'

const updateUserInfoRoute = '/api/v1/updateUserInfo'
const userDetailsRoute = '/api/v1/userDetails'

interface IUserDetailsQuery {
  email: string
}

export const updateUserDetails = async (userProfile: IUserDetailsModel): Promise<IUserAccountModel> => {
  const remoteUser = await post(updateUserInfoRoute, userProfile)
  return remoteUser
}

export const getUserDetails = async (userDetailsQuery: IUserDetailsQuery): Promise<IUserAccountModel> => {
  const remoteUser = await get(userDetailsRoute, stringify(userDetailsQuery))
  return toLocalUserAccountModel(remoteUser)
}