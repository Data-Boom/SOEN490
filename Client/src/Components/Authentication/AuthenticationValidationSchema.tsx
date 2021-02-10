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
    .email().required(requiredMessage("Email Address")), //handles the email logic, no need to add extra reg ex
  organizationName: Yup.string()
    .required(requiredMessage('Organization')),
  password: Yup.string()
    .required(requiredMessage("Password"))
    .matches(new RegExp('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/'), "Password must contain in between 8 to 30 characters, one uppercase, one number and one special case character")
    .min(8, "Password is short, should have 8 characters minimum"),
  confirmPassword: Yup.string()
    .required(requiredMessage("Confirm Password"))
    .min(8, "Password is short, should be 8 characters minimum")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(requiredMessage("Email Address")),
  password: Yup.string()
    .required(requiredMessage("Password"))
})

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(requiredMessage("Email Address"))
})

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required(requiredMessage("Password"))
    .min(8, "Password is short, should be 8 characters minimum"),
  passwordConfirmation: Yup.string()
    .required(requiredMessage("Confirm Password"))
    .min(8, "Password is short, should be 8 characters minimum")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})