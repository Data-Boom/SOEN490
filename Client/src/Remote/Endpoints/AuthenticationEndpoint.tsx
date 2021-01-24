import { ISignInUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"

import SnackbarUtils from "../../Components/SnackbarUtils"
import { post } from "../RemoteHelper"

const signupRoute = '/signup'
const loginRoute = '/login'
const resetPasswordRoute = '/resetPassword'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  const result = await post(signupRoute, signUpInfo)
  if (result == 'Success') {
    SnackbarUtils.success(`Sign up for ${signUpInfo.email} was successful!`)
  }
}

export const callLogIn = async (signInUser: ISignInUserModel): Promise<any> => {
  //server sets a token in browser cookie in http only mode
  await post(loginRoute, signInUser)
}