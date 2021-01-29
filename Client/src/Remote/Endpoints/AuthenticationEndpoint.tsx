import { ISignInUserModel, ISignUpUserModel, IResetPasswordModel, IForgotPasswordModel } from "../../Models/Authentication/ISignUpModel"

import SnackbarUtils from "../../Components/SnackbarUtils"
import { post } from "../RemoteHelper"
import { forgotPasswordRoute } from "../../Common/Consts/Routes"

const signupRoute = '/signup'
const loginRoute = '/login'
const resetPasswordRoute = '/passwordReset'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  const result = await post(signupRoute, signUpInfo)
  if (result === 'Success') {
    SnackbarUtils.success(`Sign up for ${signUpInfo.email} was successful!`)
  }
}

export const callLogIn = async (signInUser: ISignInUserModel): Promise<any> => {
  //server sets a token in browser cookie in http only mode
  await post(loginRoute, signInUser)
}

export const callResetPassword = async (resetPasswordInfo: IResetPasswordModel): Promise<any> => {
  console.log("Got to this point")
  await post(resetPasswordRoute, resetPasswordInfo);
}

export const callForgotPassword = async (forgotPasswordInfo: IForgotPasswordModel): Promise<any> => {
  await post(forgotPasswordRoute, forgotPasswordInfo);
}