import { IUserAccountModel, defaultUserAccountModel } from '../Models/Authentication/IUserAccountModel';

//todo implement 'remember me' by putting the user into local storage
export const putUserInStorage = (user: IUserAccountModel) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromStorage = (): IUserAccountModel => {
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (user) {
    return defaultUserAccountModel
  }
  return user
}

export const removeUserInStorage = () => {
  sessionStorage.removeItem('user')
  console.log(getUserFromStorage())
}
