export interface ILoginUserModel {
  email: string,
  password: string
}

export interface ISignUpUserModel {
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  organizationName: string,
  password: string,
  confirmPassword: string
}

export const newSignUpUserModel: ISignUpUserModel = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  organizationName: '',
  password: '',
  confirmPassword: ''
}

export const newLoginUserModel: ILoginUserModel = {
  email: '',
  password: ''
}