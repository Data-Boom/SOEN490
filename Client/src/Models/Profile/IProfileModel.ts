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