export interface IUserAccountRemoteModel {
  account_dateOfBirth: string,
  account_email: string,
  account_firstName: string,
  account_lastName: string,
  account_organizationName: string,
}

export interface IUserAccountModel {
  dateOfBirth: string,
  email: string,
  firstName: string,
  lastName: string,
  organizationName: string,
}

export const toLocalUserAccountModel = (remoteAccount: IUserAccountRemoteModel): IUserAccountModel => {
  const localAccountModel: IUserAccountModel = {
    dateOfBirth: remoteAccount.account_dateOfBirth,
    email: remoteAccount.account_email,
    firstName: remoteAccount.account_firstName,
    lastName: remoteAccount.account_lastName,
    organizationName: remoteAccount.account_organizationName
  }

  return localAccountModel
}