import { ISignInUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"
import { IUserAccountModel, IUserAccountRemoteModel, toLocalUserAccountModel } from "../../Models/Authentication/IUserAccountModel"

import { post } from "../RemoteHelper"

const signupRoute = '/signup'
const loginRoute = '/login'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  return post(signUpInfo, signupRoute)
}

export const callLogIn = async (signInUser: ISignInUserModel): Promise<IUserAccountModel> => {
  //server sets a token in browser cookie in http only mode
  const remoteUser: IUserAccountRemoteModel = await post(signInUser, loginRoute)
  return toLocalUserAccountModel(remoteUser)
}