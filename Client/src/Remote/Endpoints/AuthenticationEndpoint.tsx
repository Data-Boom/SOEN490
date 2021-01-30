import { ILoginUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"

import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { post } from "../FluentRequest"

const signUpRoute = '/signup'
const loginRoute = '/login'
const resetPasswordRoute = '/resetPassword'

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