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
  firstName: "asd",
  lastName: "asd",
  email: "test@email.com",
  dateOfBirth: "asd",
  organizationName: "asd123",
  password: "12312312",
  confirmPassword: "1231231221"
}