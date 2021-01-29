import { ILoginUserModel, ISignUpUserModel } from "../../Models/Authentication/ISignUpModel"

import { PostRequestExecutor } from "../RequestExecutor/Implementation/PostRequestExecutor"
import SnackbarUtils from "../../Components/Utils/SnackbarUtils"

const signUpRoute = '/signup'
const loginRoute = '/login'
const resetPasswordRoute = '/resetPassword'

export const get = (route: string): FluentRequest => {
  return new FluentRequest('get', route)
}

export const post = (route: string): FluentRequest => {
  return new FluentRequest('post', route)
}

class FluentRequest {
  url
  query
  headers = "Contetn..."

  constructor(method, route) {
    this.
  }

  static get() {
    return new RequestNoBody()
  }

  setHeaders(headers: Record<string, string>) {

  }

  withFile() {

  }

  public withBody(data) {
    this.body = data
    return this
  }

  execute() {
    await fetchRemote(this.url, this.request)
  }

  private fetchRemote = async (url: string, request: RequestInit): Promise<Response> => {
    const response = await fetch(url, request)

    if (response.status.toString().charAt(0) == '5') {
      SnackbarUtils.error('Server Unavailable')
      return Promise.resolve(null)
    }

    const message = await response.json()

    if (response.status.toString().charAt(0) == '2') {
      return message
    }

    if (response.status.toString().charAt(0) == '4') {
      SnackbarUtils.warning(JSON.stringify(message))
      return message
    }
  }

  execute() {
    fetch()
    return Response.json()
  }
}

export const callSignUp = async (signUpInfo: ISignUpUserModel): Promise<any> => {
  const response = await post(signUpRoute).withBody()
  const responseFile = await post(signUpRoute).withFile(signUpInfo).getJson()
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