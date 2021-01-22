import { IUserAccountModel } from "../Remote/Models/IUserAccountModel"

//todo implement 'remember me' by putting the user into local storage
export const putUserInStorage = (user: IUserAccountModel) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromStorage = (): IUserAccountModel => {
  return JSON.parse(sessionStorage.getItem('user'))
}

export const removeUserInStorage = (user: IUserAccountModel) => {
  sessionStorage.removeItem('user');
}
