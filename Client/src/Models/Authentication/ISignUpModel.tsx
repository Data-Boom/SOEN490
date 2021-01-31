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

export interface IForgotPasswordModel {
  email: string
}

export const defaultForgotPasswordModel: IForgotPasswordModel = {
  email: ''
}

export interface IResetPasswordModel {
  password: string,
  passwordConfirmation: string,
  resetToken: string
}

export const defaultResetPasswordModel: IResetPasswordModel = {
  password: '',
  passwordConfirmation: '',
  resetToken: ''
}