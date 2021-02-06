import { ISignUpUserModel, IResetPasswordModel, IForgotPasswordModel, ILoginUserModel } from "../../Models/Authentication/ISignUpModel"

import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { post } from "../FluentRequest"
import { forgotPasswordRoute } from "../../Common/Consts/Routes"

export const resetPasswordRoute = '/api/v1/resetPassword/:resetToken?'
const signupRoute = '/api/v1/signup'
const loginRoute = '/api/v1/login'
const logoutRoute = '/api/v1/logout'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  const result = await post(signupRoute).withBody(signUpInfo).json()
  if (result == 'Success') {
    SnackbarUtils.success(`Sign up for ${signUpInfo.email} was successful!`)
  }
}

export const callLogIn = async (loginUser: ILoginUserModel): Promise<any> => {
  //server sets a token in browser cookie in http only mode
  const result = await post(loginRoute).withBody(loginUser).json()
  return result
}

export const callLogout = async (): Promise<any> => {
  const result = await post(logoutRoute).json();
  return result;
}


export const callResetPassword = async (resetPasswordInfo: IResetPasswordModel): Promise<any> => {
  const result = await post(resetPasswordRoute).withBody(resetPasswordInfo).json()
  if (result == 'Success') {
    SnackbarUtils.success(`Password has been reset!`)
  }
}

export const callForgotPassword = async (forgotPasswordInfo: IForgotPasswordModel): Promise<any> => {
  const result = await post(forgotPasswordRoute).withBody(forgotPasswordInfo).json()
  if (result == 'Success') {
    SnackbarUtils.success(`An email has been sent for ${forgotPasswordInfo.email}!`)
  }
}