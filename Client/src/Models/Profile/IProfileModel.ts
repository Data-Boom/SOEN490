//todo remove there is a model in the authentication folder

export interface IUser {
  name: string,
  email: string,
  dateOfBirth: string,
  organization: string,
  password: string
}

export interface IPasswordFormModel {
  password: string,
  passwordConfirmation: string
}

export const defaultPasswordFormModel: IPasswordFormModel = {
  password: '',
  passwordConfirmation: ''
}