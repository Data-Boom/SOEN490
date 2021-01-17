export interface ISignInUserModel {
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
export const defaultSignUpUserModel: ISignUpUserModel = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  organizationName: '',
  password: '',
  confirmPassword: ''
}

export const defaultSignInUserModel: ISignInUserModel = {
  email: '',
  password: ''
}