export interface IUser {
  name: string,
  email: string,
  dateOfBirth: string,
  organization: string,
  password: string
}

export interface IPasswordSettings {
  password: string,
  passwordConfirmation: string
}

export interface ISignInUser{
  email: string,
  password: string
}

export interface ISignUpUser
{
  firstName: string,
  lastName: string,
  email: string,
  organization: string,
  password: string,
  confirmPassword: string
  
}