import { ISignInUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"

import { post } from "../RemoteHelper"

const signupRoute = '/signup'
const loginRoute = '/login'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  return post(signupRoute, signUpInfo)
}

export const callLogIn = async (signInUser: ISignInUserModel): Promise<any> => {
  //server sets a token in browser cookie in http only mode
  await post(loginRoute, signInUser)
}