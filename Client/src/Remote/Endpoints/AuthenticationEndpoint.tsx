import { ISignInUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"
import { IUserAccountRemoteModel, toLocalUserAccountModel } from "../Models/IUserAccountModel"

import { post } from "../RemoteHelper"

const signupRoute = '/signup'
const loginRoute = '/login'
const resetPasswordRoute = '/resetPassword'
const updateUserInfoRoute = '/updateUserInfo'
const userDetailsRoute = '/userDetails'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  return post(signUpInfo, signupRoute)
}

export const callLogIn = async (signInUser: ISignInUserModel): Promise<any> => {
  //server sets a token in browser cookie in http only mode
  const response: IUserAccountRemoteModel = await post(signInUser, loginRoute)

  //set this user in Local storage
  //todo set the guy in sessionStorage.setItem() if rememberMe == false
  localStorage.setItem('user', JSON.stringify(toLocalUserAccountModel(response)))
}