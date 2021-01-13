import { ISignUpModel } from "../../Models/Authentication/ISignUpModel"
import { post } from "../RemoteHelper"

const signupRoute = '/signup'
const loginRoute = '/login'
const resetPasswordRoute = '/resetPassword'
const updateUserInfoRoute = '/updateUserInfo'
const userDetailsRoute = '/userDetails'

export const signUpCall = async (signUpInfo: ISignUpModel) => {
  /// call backend here and return something
  const response = await post(signUpInfo, signupRoute)
  console.log(response)
  setJWT(response.JWT)
}

const setJWT = (token: string) => {
  //todo set token
}