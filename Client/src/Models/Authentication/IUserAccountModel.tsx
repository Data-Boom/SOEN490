export interface IUserAccountRemoteModel {
  account_orcID: number,
  account_email: string,
  account_firstName: string,
  account_lastName: string,
  account_organizationName: string,
  account_permissions: number
}

export interface IUserAccountModel {
  orcID: number,
  email: string,
  firstName: string,
  lastName: string,
  organizationName: string,
  sessionExpiration?: any,
  account_permissions: number
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
    email: remoteAccount.account_email,
    firstName: remoteAccount.account_firstName,
    lastName: remoteAccount.account_lastName,
    organizationName: remoteAccount.account_organizationName,
    account_permissions: remoteAccount.account_permissions
  }

  return localAccountModel
}

export const defaultUserAccountModel: IUserAccountModel = {
  orcID: 0,
  email: '',
  firstName: '',
  lastName: '',
  organizationName: '',
  sessionExpiration: null,
  account_permissions: -1
}
