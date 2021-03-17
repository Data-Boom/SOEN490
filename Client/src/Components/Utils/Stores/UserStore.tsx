import { IUserAccountModel, defaultUserAccountModel } from "../../../Models/Authentication/IUserAccountModel"
import { callLogIn, callLogout } from "../../../Remote/Endpoints/AuthenticationEndpoint"

import { ILoginUserModel } from "../../../Models/Authentication/ISignUpModel"
import { getUserDetails } from "../../../Remote/Endpoints/UserEndpoint"
import moment from "moment"

export class UserStore {
  user: IUserAccountModel

  async login(loginUserInfo: ILoginUserModel) {
    const loginResponse = await callLogIn(loginUserInfo)
    if (loginResponse) {
      await this.loadUser(loginUserInfo.email, loginResponse.ValidFor)
    }
  }

  async logout() {
    this.user = defaultUserAccountModel
    await callLogout()
  }

  private async loadUser(email: string, validFor: number) {
    const userAccount: IUserAccountModel = await getUserDetails({ email: email })
    userAccount.sessionExpiration = moment.duration(validFor).asMilliseconds()
    this.user = userAccount
  }

  removeUser() {

  }
}