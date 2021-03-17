import { IUserAccountModel } from "../../../Models/Authentication/IUserAccountModel"

export class UserStore {
  user: IUserAccountModel

  async loadUser() {
    const userAccount: IUserAccountModel = await getUserDetails({ email: loginUserInfo.email })
    userAccount.sessionExpiration = moment.duration(loginResponse.ValidFor).asMilliseconds()
    this.user = userAccount
  }
}