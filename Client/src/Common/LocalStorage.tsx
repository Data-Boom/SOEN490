import { IUserAccountModel } from "../Remote/Models/IUserAccountModel"

export const putUserInStorage = (user: IUserAccountModel) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromStorage = (): IUserAccountModel => {
  return JSON.parse(localStorage.getItem('user'))
}