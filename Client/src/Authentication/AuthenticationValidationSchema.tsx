import * as Yup from 'yup'

const requiredMessage = (fieldName: string): string => {
    return `${fieldName} is a required field`
}

export const signupValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required(requiredMessage('First Name')),
    lastName: Yup.string()
        .required(requiredMessage('Last Name')),
    email: Yup.string()
        .email().required(requiredMessage("Email Address")),
    organization: Yup.string()
        .required(requiredMessage('Organization')),
    password: Yup.string()
        .required(requiredMessage("Password"))
        .min(8, "Password is short, should be 8 characters minimum"),
    confirmPassword: Yup.string()
        .required(requiredMessage("Confirm Password"))
        .min(8, "Password is short, should be 8 characters minimum"),
    dateOfBirth: Yup.date()
        .required(requiredMessage("Date of Birth")),
})

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required(requiredMessage("Email Address")),
    password: Yup.string()
        .required(requiredMessage("Password"))
})