import { ILoginUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"

import { PostRequestExecutor } from "../RequestExecutor/Implementation/PostRequestExecutor"
import SnackbarUtils from "../../Components/Utils/SnackbarUtils"

const signUpRoute = '/signup'
const loginRoute = '/login'
const resetPasswordRoute = '/resetPassword'

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  const requestExecutor = new PostRequestExecutor(signUpRoute, signUpInfo)
  const result = await requestExecutor.execute()
  if (result == 'Success') {
    SnackbarUtils.success(`Sign up for ${signUpInfo.email} was successful!`)
  }
}

export const callLogIn = async (loginUser: ILoginUserModel): Promise<any> => {
  //server sets a token in browser cookie in http only mode
  const requestExecutor = new PostRequestExecutor(loginRoute, loginUser)
  const result = await requestExecutor.execute()
}