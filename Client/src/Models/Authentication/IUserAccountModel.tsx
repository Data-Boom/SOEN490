export interface IUserAccountRemoteModel {
  //account_dateOfBirth: string,
  account_orcID: number,
  account_email: string,
  account_firstName: string,
  account_lastName: string,
  account_organizationName: string,
}

export interface IUserAccountModel {
  //dateOfBirth: string,
  orcID: number,
  email: string,
  firstName: string,
  lastName: string,
  organizationName: string,
}

export interface IUserDetailsModel extends IUserAccountModel {
  password?: string
}

export const toLocalUserAccountModel = (remoteAccount: IUserAccountRemoteModel): IUserAccountModel => {
  if (remoteAccount == null) {
    return null
  }
  const localAccountModel: IUserAccountModel = {
    orcID: remoteAccount.account_orcID,
    //dateOfBirth: remoteAccount.account_dateOfBirth,
    email: remoteAccount.account_email,
    firstName: remoteAccount.account_firstName,
    lastName: remoteAccount.account_lastName,
    organizationName: remoteAccount.account_organizationName
  }

  return localAccountModel
}

export const defaultUserAccountModel: IUserAccountModel = {
  //dateOfBirth: '',
  orcID: 0,
  email: '',
  firstName: '',
  lastName: '',
  organizationName: ''
}