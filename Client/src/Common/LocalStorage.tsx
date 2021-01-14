import { IUserAccountModel } from "../Remote/Models/IUserAccountModel"

export const putUserInStorage = (user: IUserAccountModel) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromStorage = (): IUserAccountModel => {
  return JSON.parse(sessionStorage.getItem('user'))
}