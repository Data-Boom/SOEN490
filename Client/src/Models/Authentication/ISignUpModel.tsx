export interface ISignInUserModel {
  email: string,
  password: string
}

export interface ISignUpUserModel {
  firstName: string,
  lastName: string,
  email: string,
  organizationName: string,
  password: string,
  confirmPassword: string
}

//todo revert to an actual empty/default model
//todo password should match
export const defaultSignUpUserModel: ISignUpUserModel = {
  firstName: "asd",
  lastName: "asd",
  organizationName: "asd123",
  email: "test@email.com",
  password: "12312312",
  confirmPassword: "1231231221"
}