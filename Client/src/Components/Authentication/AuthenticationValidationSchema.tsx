import * as Yup from 'yup'

const requiredMessage = (fieldName: string): string => {
  return `${fieldName} is a required field`
}

const passwordSchema = Yup.string().required().matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/), "Password must contain in between 8 to 30 characters, one uppercase, one number and one special case character")

const emailSchema = Yup.string().email().required(requiredMessage("Email Address"))

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(requiredMessage('First Name')),
  lastName: Yup.string()
    .required(requiredMessage('Last Name')),
  email: emailSchema,
  organizationName: Yup.string()
    .required(requiredMessage('Organization')),
  password: passwordSchema,
  confirmPassword: Yup.string()
    .required(requiredMessage("Confirm Password"))
    .min(8, "Password is short, should be 8 characters minimum")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const loginValidationSchema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string().required()//if i use passwordSchema, it won't let existing user with short passwords log in
})

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: emailSchema
})

export const resetPasswordValidationSchema = Yup.object().shape({
  password: passwordSchema,
  passwordConfirmation: Yup.string()
    .required(requiredMessage("Confirm Password"))
    .min(8, "Password is short, should be 8 characters minimum")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})