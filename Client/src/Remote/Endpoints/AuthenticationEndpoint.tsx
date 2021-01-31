import { ISignUpUserModel, IResetPasswordModel, IForgotPasswordModel, ILoginUserModel } from "../../Models/Authentication/ISignUpModel"

import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { post } from "../FluentRequest"

export const resetPasswordRoute = '/api/v1/resetPassword/:resetToken?'
const signupRoute = '/api/v1/signup'
const loginRoute = '/api/v1/login'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  const result = await post(signUpRoute).withBody(signUpInfo).json()
  if (result == 'Success') {
    SnackbarUtils.success(`Sign up for ${signUpInfo.email} was successful!`)
  }
}

export const callLogIn = async (loginUser: ILoginUserModel): Promise<any> => {
  //server sets a token in browser cookie in http only mode
  const result = await post(loginRoute).withBody(loginUser).json()
  return result
}

export const callResetPassword = async (resetPasswordInfo: IResetPasswordModel): Promise<any> => {
  await post(resetPasswordRoute, resetPasswordInfo);
}

export const callForgotPassword = async (forgotPasswordInfo: IForgotPasswordModel): Promise<any> => {
  await post(forgotPasswordRoute, forgotPasswordInfo);
}