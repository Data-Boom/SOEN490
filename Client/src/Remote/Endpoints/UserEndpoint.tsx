import { IUserAccountModel, IUserDetailsModel, toLocalUserAccountModel } from "../../Models/Authentication/IUserAccountModel"
import { get, post } from "../FluentRequest"

import { IApprovedDatasetModel } from "../../Models/Datasets/IApprovedDatasetModel"

//import { toLocalApprovedDatasets } from "../../Models/Datasets/IRemoteApprovedDatasetModel"

const updateUserInfoRoute = '/api/v1/updateUserInfo'
const userDetailsRoute = '/api/v1/userDetails'

const userFlaggedDatasetsRoute = '/api/v1/userFlaggedDatasets'

interface IUserDetailsQuery {
  email: string
}

export const updateUserDetails = async (userProfile: IUserDetailsModel): Promise<IUserAccountModel> => {
  const remoteUser = await post(updateUserInfoRoute).withBody(userProfile).json()
  return remoteUser
}

export const getUserDetails = async (userDetailsQuery: IUserDetailsQuery): Promise<IUserAccountModel> => {
  const remoteUser = await get(userDetailsRoute).withQuery(userDetailsQuery).json()
  return toLocalUserAccountModel(remoteUser)
}

export const getUserFlaggedDatasets = async (): Promise<IApprovedDatasetModel[]> => {
  const remoteDatasets = await get(userFlaggedDatasetsRoute).json()
  //const localDatasets = toLocalApprovedDatasets(remoteDatasets) Unsure if this is needed anymore.
  return remoteDatasets
}