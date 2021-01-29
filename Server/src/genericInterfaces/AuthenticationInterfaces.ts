export interface ILoginInformation {
    email: string,
    password: string
}

export interface IPasswordResetInformation {
    email: string
}

export interface IPasswordUpdateInformation {
    password: string,
    passwordConfirmation: string,
    jwtToken: string
}

export interface ISignUpInformation {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    organizationName: string,
    isAdmin?: boolean
}

export interface IJwtParams {
    email: string,
    account_id: number,
    firstName: string
}

export interface IUpdateUserDetail {
    email: string,
    password?: string,
    organizationName?: string
}

export interface IFetchUserDetail {
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    organizationName: string,
}