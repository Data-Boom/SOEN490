import { ISignInUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"

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
  /// call backend here and return something
  const response = await post(signInUser, loginRoute)
  console.log(response)
  const token = response.token
  setJWT(token)
}

const setJWT = (token: string) => {
  //todo set token

}