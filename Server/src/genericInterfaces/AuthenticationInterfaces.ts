export interface ILoginInformation {
    email: string,
    password: string
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
    account_id: number,
    firstName: string
}

export interface IUserDetailUpdater {
    email: string,
    password?: string,
    organization?: string
}
export interface IUserDetails {
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    organizationName: string,
}