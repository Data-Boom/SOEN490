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

export interface IResetPasswordModel {
  password: string,
  passwordConfirmation: string,
  resetToken: string
}

export interface IForgotPasswordModel {
  email: string
}

//todo revert to an actual empty/default model
//todo password should match
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

export const defaultForgotPasswordModel: IForgotPasswordModel = {
  email: ''
}

export const defaultResetPasswordModel: IResetPasswordModel = {
  password: '',
  passwordConfirmation: '',
  resetToken: ''
}