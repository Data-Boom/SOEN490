export interface ISignInUserModel {
  email: string,
  password: string
}

export interface ISignUpUserModel {
  firstName: string,
  lastName: string,
  email: string,
  organization: string,
  password: string,
  confirmPassword: string
}